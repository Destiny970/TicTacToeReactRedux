import React from 'react';
import {Board} from './features/board/Board';
import './App.css';
import './features/board/Board.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board />
      </header>
    </div>
  );
}

export default App;
