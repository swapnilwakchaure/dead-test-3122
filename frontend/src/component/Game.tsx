import GameBoard from './GameBoard';
import { useState, useEffect } from 'react';
import './Game.css';

function Game() {
  const [board, setBoard] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [playerImages, setPlayerImages] = useState<string[]>([]);
  const [player1Image, setPlayer1Image] = useState<string | null>(null);
const [player2Image, setPlayer2Image] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    if (timeLeft === 0) {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      setTimeLeft(30);
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, currentPlayer]);

  useEffect(() => {
    // get player images from local storage or API
    // and store them in player1Image and player2Image state variables
    const storedPlayer1Image = localStorage.getItem('player1Image');
    const storedPlayer2Image = localStorage.getItem('player2Image');
    setPlayer1Image(storedPlayer1Image);
    setPlayer2Image(storedPlayer2Image);
  }, []);
  

  function handleColClick(rowIndex: number, colIndex: number) {
    // Check if the clicked box is already occupied
    if (board[rowIndex][colIndex] !== '') {
      return;
    }
  
    // make a copy of the board state
    const newBoard = [...board];
  
    // update the clicked column with a random image
    const playerImages = [player1Image, player2Image].filter(Boolean) as string[];
    const randomImage = playerImages[Math.floor(Math.random() * playerImages.length)];
    newBoard[rowIndex][colIndex] = randomImage;
  
    // set the new board state and switch to the other player
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  
    // update the current player's score based on the number of images in the clicked column
    const colImages = newBoard.map(row => row[colIndex]);
    if (currentPlayer === 1 && player1Image && colImages.includes(player1Image)) {
      setPlayer1Score(player1Score + colImages.filter(img => img === player1Image).length);
    } else if (currentPlayer === 2 && player2Image && colImages.includes(player2Image)) {
      setPlayer2Score(player2Score + colImages.filter(img => img === player2Image).length);
    }
  }
  

  return (
    <div className="game-container">
      <div className="game-board-container">
        <div>Time left: {timeLeft}s</div>
        <GameBoard board={board} handleColClick={handleColClick} />
      </div>
      <div className="leaderboard-container">
        <div className="leaderboard-heading">Leaderboard</div>
        <div className="leaderboard">
          <div className={`player-score ${currentPlayer === 1 ? 'active' : ''}`}>
            Player 1: {player1Score}
          </div>
          <div className={`player-score ${currentPlayer === 2 ? 'active' : ''}`}>
            Player 2: {player2Score}
          </div>
        </div>
        </div>
        </div>
  )
  
}

export default Game