import {useState} from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
function App() {
  const [selectedPlayer, setSelectedPlayer] = useState('X');

  function handleSelectedSquare() {
    setSelectedPlayer((prevSelectedPlayer) => prevSelectedPlayer === 'X' ? 'O' : 'X')
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
      LOG
    </main>
  )
}

export default App
