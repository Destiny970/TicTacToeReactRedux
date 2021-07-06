import React, { useEffect } from 'react';
import {Board} from './features/board/Board';
import './App.css';
import './features/board/Board.css'

function App() {
  useEffect(()=>{
    let socket = new WebSocket("wss://2fz9uwqp51.execute-api.us-east-2.amazonaws.com/Prod");
    socket.onmessage = function(event){
      console.log(event.data);
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
