import GameBoard from './GameBoard';
import { useState, useEffect } from 'react';
import './Game.css';

function Game() {
   type Box = {
  image: '' | string;
  clicked: boolean;
};

const [board, setBoard] = useState<Box[][]>(
  [
    [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
    [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
    [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
    [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
    [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }]
  ]
);

      
  
  
const [player1Score, setPlayer1Score] = useState<number>(0);
const [player2Score, setPlayer2Score] = useState<number>(0);
const [currentPlayer, setCurrentPlayer] = useState<number>(1);
const [playerImages, setPlayerImages] = useState<Array<string>>([]);
const [timeLeft, setTimeLeft] = useState<number>(30);
const [showPopup, setShowPopup] = useState<boolean>(false);
const player1ImageArray = playerImages.length > 0 ? [playerImages[0]] : [];
const player2ImageArray = playerImages.length > 1 ? [playerImages[1]] : [];
const [scores, setScores] = useState<[number, number]>([0, 0]);
const [winner, setWinner] = useState<string>('');

// const [scores, setScores] = useState<[number, number]>([0, 0]);


// const winner = scores[0] > scores[1] ? 'Player 1' : scores[1] > scores[0] ? 'Player 2' : ''


useEffect(() => {
    if (timeLeft === 0) {
      setShowPopup(true);
      if (scores[0] > scores[1]) {
        setWinner('Player 1');
      } else if (scores[1] > scores[0]) {
        setWinner('Player 2');
      } else {
        setWinner('Tie');
      }
      return;
    }
    const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
  }, [timeLeft, scores]);

useEffect(() => {

  const user1: string | null = localStorage.getItem('user1');
  const user2: string | null = localStorage.getItem('user2');
  if (user1 && user2) {
    const player1Image = JSON.parse(user1).avatar;
    const player2Image = JSON.parse(user2).avatar;
    setPlayerImages([player1Image, player2Image]);
  }
}, []);
function handleColClick(rowIndex: number, colIndex: number) {
    if (board[rowIndex][colIndex].clicked) {
      return;
    }
  
    const currentBox = board[rowIndex][colIndex];
  
    const images = [...player1ImageArray, ...player2ImageArray];
    const currentPlayerImage = images[currentPlayer - 1];
    const newBoard = board.map((row, rIndex) =>
      row.map((box, bIndex) => {
        if (rIndex === rowIndex && bIndex === colIndex) {
          return { image: currentPlayerImage, clicked: true };
        }
        return box;
      })
    );
  
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  
    const colImages = newBoard.map((row) => row[colIndex].image);
    const currentScore = colImages.filter((img) => img === currentPlayerImage).length;
    const newScores = [...scores];
    if (currentPlayer === 1 && player1ImageArray.includes(currentPlayerImage)) {
      newScores[0] += 1;
    } else if (currentPlayer === 2 && player2ImageArray.includes(currentPlayerImage)) {
      newScores[1] += 1;
    }
    
        newScores[currentPlayer - 1] += 1;
        setScores([newScores[0], newScores[1]]);
  }
  
  


  

function handleRestart() {
setShowPopup(false);
setBoard(  [
    [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
    [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
    [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
    [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
    [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }]
  ]);
  setScores([0, 0]);
      setCurrentPlayer(1);
      setTimeLeft(30);
      setWinner("")
}



// function handleColClick(rowIndex: number, colIndex: number) {
//     if (board[rowIndex][colIndex].clicked) {
//       return;
//     }
  
//     const currentBox = board[rowIndex][colIndex];
  
//     const images = [...player1ImageArray, ...player2ImageArray];
//     const currentPlayerImage = images[currentPlayer - 1];
//     const newBoard = board.map((row, rIndex) =>
//       row.map((box, bIndex) => {
//         if (rIndex === rowIndex && bIndex === colIndex) {
//           return { image: currentPlayerImage, clicked: true };
//         }
//         return box;
//       })
//     );
  
//     setBoard(newBoard);
//     setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  
//     const colImages = newBoard.map(row => row[colIndex].image);
//     const currentScore = colImages.filter(img => img === currentPlayerImage).length;
//     const newScores = [...scores];
//     newScores[currentPlayer - 1] += currentScore;
//     setScores([newScores[0], newScores[1]]);
//   }
  
  


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
          Player 1: {scores[0]}
        </div>
        <div className={`player-score ${currentPlayer === 2 ? 'active' : ''}`}>
          Player 2: {scores[1]}
        </div>
      </div>
      {winner && <div className="winner">Winner: {winner}</div>}
      
    </div>


    {timeLeft === 0 && (
      <div className="overlay">
        <div className="popup">
          <h2>Game Over</h2>
          {winner && <div className="winner">Winner: {winner}</div>}
          <button onClick={handleRestart}>Restart</button>
        </div>
      </div>
    )}
  </div>
  )
  
}

export default Game






















































// import GameBoard from './GameBoard';
// import { useState, useEffect } from 'react';
// import './Game.css';

// function Game() {
//    type Box = {
//   image: '' | string;
//   clicked: boolean;
// };

// const [board, setBoard] = useState<Box[][]>(
//   [
//     [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
//     [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
//     [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
//     [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
//     [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }]
//   ]
// );

      
  
  
// const [player1Score, setPlayer1Score] = useState<number>(0);
// const [player2Score, setPlayer2Score] = useState<number>(0);
// const [currentPlayer, setCurrentPlayer] = useState<number>(1);
// const [playerImages, setPlayerImages] = useState<Array<string>>([]);
// const [timeLeft, setTimeLeft] = useState<number>(30);
// const [showPopup, setShowPopup] = useState<boolean>(false);
// const player1ImageArray = playerImages.length > 0 ? [playerImages[0]] : [];
// const player2ImageArray = playerImages.length > 1 ? [playerImages[1]] : [];





// useEffect(() => {
// if (timeLeft === 0) {
// setShowPopup(true);
// return;
// }
// const timer = setTimeout(() => {
// setTimeLeft(timeLeft - 1);
// }, 1000);
// return () => clearTimeout(timer);
// }, [timeLeft]);

// useEffect(() => {

//   const user1: string | null = localStorage.getItem('user1');
//   const user2: string | null = localStorage.getItem('user2');
//   if (user1 && user2) {
//     const player1Image = JSON.parse(user1).avatar;
//     const player2Image = JSON.parse(user2).avatar;
//     setPlayerImages([player1Image, player2Image]);
//   }
// }, []);



// function handleColClick(rowIndex: number, colIndex: number) {
    
//     if (board[rowIndex][colIndex].clicked) {
//       return;
//     }
  

//     const currentBox = board[rowIndex][colIndex];
  
//     const images = [...player1ImageArray, ...player2ImageArray];
//     const currentPlayerImage = images[currentPlayer - 1];
//     const newBoard = board.map((row, rIndex) =>
//       row.map((box, bIndex) => {
//         if (rIndex === rowIndex && bIndex === colIndex) {
//           return { image: currentPlayerImage, clicked: true };
//         }
//         return box;
//       })
//     );
  
   
//     setBoard(newBoard);
//     setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  
   
//     const colImages = newBoard.map(row => row[colIndex].image);
//     const currentScore = colImages.filter(img => img === currentPlayerImage).length;
//     if (currentPlayer === 1 && player1ImageArray.includes(currentPlayerImage)) {
//       setPlayer1Score(player1Score + currentScore);
//     } else if (currentPlayer === 2 && player2ImageArray.includes(currentPlayerImage)) {
//       setPlayer2Score(player2Score + currentScore);
//     }
//   }
  


  

// function handleRestart() {
// setShowPopup(false);
// setBoard(  [
//     [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
//     [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
//     [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
//     [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }],
//     [{ image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }, { image: '', clicked: false }]
//   ]);
// setPlayer1Score(0);
// setPlayer2Score(0);
// setCurrentPlayer(1);
// setTimeLeft(30);
// }
   

//   return (
//     <div className="game-container">
//     <div className="game-board-container">
//       <div>Time left: {timeLeft}s</div>
//       <GameBoard board={board} handleColClick={handleColClick} />
//     </div>
//     <div className="leaderboard-container">
//       <div className="leaderboard-heading">Leaderboard</div>
//       <div className="leaderboard">
//         <div className={`player-score ${currentPlayer === 1 ? 'active' : ''}`}>
//           Player 1: {player1Score}
//         </div>
//         <div className={`player-score ${currentPlayer === 2 ? 'active' : ''}`}>
//           Player 2: {player2Score}
//         </div>
//       </div>
//     </div>

//     {timeLeft === 0 && (
//       <div className="overlay">
//         <div className="popup">
//           <h2>Game Over</h2>
//           <button onClick={handleRestart}>Restart</button>
//         </div>
//       </div>
//     )}
//   </div>
//   )
  
// }

// export default Game
























// import GameBoard from './GameBoard';
// import { useState, useEffect } from 'react';
// import './Game.css';

// function Game() {
//   const [board, setBoard] = useState<string[][]>([
//     ['', '', ''],
//     ['', '', ''],
//     ['', '', ''],
//   ]);
//   const [player1Score, setPlayer1Score] = useState<number>(0);
//   const [player2Score, setPlayer2Score] = useState<number>(0);
//   const [currentPlayer, setCurrentPlayer] = useState<number>(1);
//   const [playerImages, setPlayerImages] = useState<string[]>([]);
//   const [player1Image, setPlayer1Image] = useState<string | null>(null);
// const [player2Image, setPlayer2Image] = useState<string | null>(null);

//   const [timeLeft, setTimeLeft] = useState<number>(30);

//   useEffect(() => {
//     if (timeLeft === 0) {
//       setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
//       setTimeLeft(30);
//     }
//     const timer = setTimeout(() => {
//       setTimeLeft(timeLeft - 1);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, [timeLeft, currentPlayer]);

//   useEffect(() => {
//     // get player images from local storage or API
//     // and store them in player1Image and player2Image state variables
//     const storedPlayer1Image = localStorage.getItem('player1Image');
//     const storedPlayer2Image = localStorage.getItem('player2Image');
//     setPlayer1Image(storedPlayer1Image);
//     setPlayer2Image(storedPlayer2Image);
//   }, []);
  

//   function handleColClick(rowIndex: number, colIndex: number) {
//     // Check if the clicked box is already occupied
//     if (board[rowIndex][colIndex] !== '') {
//       return;
//     }
  
//     // make a copy of the board state
//     const newBoard = [...board];
  
//     // update the clicked column with a random image
//     const playerImages = [player1Image, player2Image].filter(Boolean) as string[];
//     const randomImage = playerImages[Math.floor(Math.random() * playerImages.length)];
//     newBoard[rowIndex][colIndex] = randomImage;
  
//     // set the new board state and switch to the other player
//     setBoard(newBoard);
//     setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  
//     // update the current player's score based on the number of images in the clicked column
//     const colImages = newBoard.map(row => row[colIndex]);
//     if (currentPlayer === 1 && player1Image && colImages.includes(player1Image)) {
//       setPlayer1Score(player1Score + colImages.filter(img => img === player1Image).length);
//     } else if (currentPlayer === 2 && player2Image && colImages.includes(player2Image)) {
//       setPlayer2Score(player2Score + colImages.filter(img => img === player2Image).length);
//     }
//   }
  

//   return (
//     <div className="game-container">
//       <div className="game-board-container">
//         <div>Time left: {timeLeft}s</div>
//         <GameBoard board={board} handleColClick={handleColClick} />
//       </div>
//       <div className="leaderboard-container">
//         <div className="leaderboard-heading">Leaderboard</div>
//         <div className="leaderboard">
//           <div className={`player-score ${currentPlayer === 1 ? 'active' : ''}`}>
//             Player 1: {player1Score}
//           </div>
//           <div className={`player-score ${currentPlayer === 2 ? 'active' : ''}`}>
//             Player 2: {player2Score}
//           </div>
//         </div>
//         </div>
//         </div>
//   )
  
// }

// export default Game
