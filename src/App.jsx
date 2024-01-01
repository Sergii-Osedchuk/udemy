import {useState} from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('X');
  

  function handleSelectedSquare(rowIndex, colIndex) {
    setSelectedPlayer((prevSelectedPlayer) => (prevSelectedPlayer === 'X' ? 'O' : 'X'));
    setGameTurns((prevTurns) => {
      let currentPlayer = 'X';
      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      };
      const updatedTurns = [{ square : {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
        return updatedTurns;
    }); 
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className="highlight-player">
          <Player initialName='Player1' symbol='X' isActive={selectedPlayer === 'X'}/>
          <Player initialName='Player2' symbol='O' isActive={selectedPlayer === 'O'}/>
        </ol>
        <GameBoard onSelectSquare = {handleSelectedSquare} turns={gameTurns}/>
      </div>
      <Log />
    </main>
  )
}

export default App
