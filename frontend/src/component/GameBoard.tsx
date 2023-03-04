import React from 'react';
import './GameBoard.css';
import clickSound from '../assets/clickSound/clickSound.mp3';

interface Box {
    image: string;
    // add more properties here if needed
  }

interface Props {
    board: Box[][];
    handleColClick: (rowIndex: number, colIndex: number) => void;
  }
  
  


function GameBoard(props: Props) {
  const playSound = () => {
    const sound = new Audio(clickSound);
    sound.play();
  };

  return (
    <div className="game-board">
      {props.board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((col, colIndex) => (
            <div className={`col ${col.image}`} key={`${rowIndex}-${colIndex}`}

              onClick={(event) => {
                props.handleColClick(rowIndex, colIndex);
                playSound();
                (event.currentTarget as HTMLDivElement).classList.add('clicked');
              }}
            >
              <img src={col.image} alt="" className="img-thumbnail" />

            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;




























// import React from 'react';
// import './GameBoard.css';
// import clickSound from '../assets/clickSound/clickSound.mp3';

// interface Props {
//   board: string[][];
//   handleColClick: (rowIndex: number, colIndex: number) => void;
// }



// function GameBoard(props: Props) {
//   const playSound = () => {
//     const sound = new Audio(clickSound);
//     sound.play();
//   };

//   return (
//     <div className="game-board">
//       {props.board.map((row, rowIndex) => (
//         <div className="row" key={rowIndex}>
//           {row.map((col, colIndex) => (
//             <div
//               className={`col ${col}`}
//               key={`${rowIndex}-${colIndex}`}
//               onClick={(event) => {
//                 props.handleColClick(rowIndex, colIndex);
//                 playSound();
//                 (event.currentTarget as HTMLDivElement).classList.add('clicked');
//               }}
//             >
//               <img src={col} alt="" className="img-thumbnail" />
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default GameBoard;













// import React from 'react';
// import './GameBoard.css';
// import clickSound from '../assets/clickSound/clickSound.mp3';

// declare module '*.mp3' {
//   const src: string;
//   export default src;
// }


// interface Props {
//   board: string[][];
//   handleColClick: (rowIndex: number, colIndex: number) => void;
// }

// function GameBoard(props: Props) {

//   const playSound = () => {
//     const sound = new Audio(clickSound);
//     sound.play();
//   };

//   return (
//     <div className="game-board">
//       {props.board.map((row, rowIndex) => (
//         <div className="row" key={rowIndex}>
//           {row.map((col, colIndex) => (
//             <div
//               className={`col ${col}`}
//               key={`${rowIndex}-${colIndex}`}
//               onClick={(event) => {
//                 props.handleColClick(rowIndex, colIndex);
//                 playSound();
//                 event.currentTarget.classList.add('clicked');
//               }}
//             >
//               <img src={col} alt="" className="img-thumbnail" />
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default GameBoard;
