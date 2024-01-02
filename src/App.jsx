import {useState} from 'react';

import Player from './components/Player';
import GameBoard from './components/GameBoard';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currentPlayer = 'O';
    };
    return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const selectedPlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;
  let winner;

  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol &&
          firstSquareSymbol === secondSquareSymbol &&
          firstSquareSymbol === thirdSquareSymbol) {
            winner = firstSquareSymbol;
          }
  }

  let hasDraw = gameTurns.length === 9 && !winner;
  
  function handleSelectedSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)

      const updatedTurns = [{ square : {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
        return updatedTurns;
    }); 
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className="highlight-player">
          <Player initialName='Player1' symbol='X' isActive={selectedPlayer === 'X'} />
          <Player initialName='Player2' symbol='O' isActive={selectedPlayer === 'O'} />
        </ol>
        {(winner || hasDraw) && <GameOver winner = {winner}/>}
        <GameBoard onSelectSquare = {handleSelectedSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
