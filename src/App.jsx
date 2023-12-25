import {useState} from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
function App() {
  const [selectedPlayer, setSelectedPlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([])

  function handleSelectedSquare(rowIndex, colIndex) {
    setSelectedPlayer((prevSelectedPlayer) => prevSelectedPlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      let currentPlayer = 'X';
      (prevTurns[0].player === 'X' && prevTurns.length > 0) ? currentPlayer = 'O' : currentPlayer = 'X';
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
        <GameBoard onSelectSquare = {handleSelectedSquare} activePlayerSymbol={selectedPlayer}/>
      </div>
      <Log />
    </main>
  )
}

export default App
