import React, { useEffect } from 'react';
import {Board} from './features/board/Board';
import './App.css';
import './features/board/Board.css'
import {updateData} from './features/board/boardSlice'
import { useDispatch } from 'react-redux'
import {takeSocket} from './features/socket/socketSlice'

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    let socket = new WebSocket("wss://2fz9uwqp51.execute-api.us-east-2.amazonaws.com/Prod");
    socket.onopen = function(event){
      socket.send(JSON.stringify({type:"getGame"}));
      dispatch(takeSocket(socket));
    }
    socket.onmessage = function(event){
      const data = JSON.parse(event.data).Item;
      dispatch(updateData(data));
    }
  });
  return (
    <div className="App">
      <header className="App-header">
        <Board />
      </header>
    </div>
  );
}

export default App;
