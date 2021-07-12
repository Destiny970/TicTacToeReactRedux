const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10', region: process.env.AWS_REGION });

exports.onConnect = async event => {
  const putParams = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: event.requestContext.connectionId
    }
  };

  try {
    await ddb.put(putParams).promise();
  } catch (err) {
    return { statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(err) };
  }

  return { statusCode: 200, body: 'Connected.' };
};

exports.onDisconnect = async event => {
    const deleteParams = {
      TableName: process.env.TABLE_NAME,
      Key: {
        id: event.requestContext.connectionId
      }
    };
  
    try {
      await ddb.delete(deleteParams).promise();
    } catch (err) {
      return { statusCode: 500, body: 'Failed to disconnect: ' + JSON.stringify(err) };
    }
  
    return { statusCode: 200, body: 'Disconnected.' };
  };

exports.sendMessage = async event => {
    let connectionData;
  
    try {
      connectionData = await ddb.scan({ TableName: process.env.TABLE_NAME, ProjectionExpression: 'id' }).promise();
    } catch (e) {
      return { statusCode: 500, body: e.stack };
    }
    const postType = JSON.parse(event.body).type;
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
    });
    if(postType==="getGame"){
      const body = await ddb
      .get({
        TableName: "http-crud-tutorial-items",
        Key: {
          id: "GAME#001"
        }
      })
      .promise();
      await apigwManagementApi.postToConnection({ ConnectionId: event.requestContext.connectionId, Data: JSON.stringify(body) }).promise();
      return { statusCode: 200, body: JSON.stringify(body) };
    }
    else if(postType==="putGame"){
      try {
        const gameState = JSON.parse(event.body).payload;
        const postData = connectionData.Items.map(async ({ id: connectionId }) => {
          try {
            if(connectionId!=="GAME#001") {
              await apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: JSON.stringify({Item: gameState}) }).promise();
            } 
          } catch (e) {
            if (e.statusCode === 410) {
              console.log(`Found stale connection, deleting ${connectionId}`);
              await ddb.delete({ TableName: process.env.TABLE_NAME, Key: { connectionId } }).promise();
            } else {
              throw e;
            }
          }
        });
        await Promise.all([
          ddb
			    .put({
			    TableName: "http-crud-tutorial-items",
            Item: {
              id: "GAME#001",
              squares: gameState.squares,
			        xIsNext: gameState.xIsNext,
            }	
		    })
		    .promise(),
        ...postData
      ]);
      } catch (e) {
        return { statusCode: 500, body: e.stack };
      }
  
      return { statusCode: 200, body: 'Data sent.' };
    }
  };  