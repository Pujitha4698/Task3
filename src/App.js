import React from 'react';
import Game from './components/Game';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic-Tac-Toe</h1>
        <Game />
      </header>
    </div>
  );
}

export default App;
