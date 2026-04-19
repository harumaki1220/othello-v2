import { useState } from "react";
import { Board } from "./components/Board";
import {
  putDisc,
  getOpponent,
  createInitialBoard,
  getValidMoves,
} from "./logic/board";

function App() {
  const [board, setBoard] = useState(createInitialBoard());
  const [turn, setTurn] = useState<"BLACK" | "WHITE">("BLACK");
  const [winner, setWinner] = useState<"BLACK" | "WHITE" | "DRAW" | null>(null);

  const currentValidMoves = getValidMoves(board, turn);
  const blackCount = board.flat().filter((cell) => cell === "BLACK").length;
  const whiteCount = board.flat().filter((cell) => cell === "WHITE").length;

  const handleCellClick = (x: number, y: number) => {
    const nextBoard = putDisc(board, turn, x, y);

    if (nextBoard) {
      setBoard(nextBoard);

      const nextBlackCount = nextBoard
        .flat()
        .filter((cell) => cell === "BLACK").length;
      const nextWhiteCount = nextBoard
        .flat()
        .filter((cell) => cell === "WHITE").length;

      const opponent = getOpponent(turn);
      const opponentMoveCount = getValidMoves(nextBoard, opponent).length;
      const myMoveCount = getValidMoves(nextBoard, turn).length;

      if (opponentMoveCount > 0) {
        setTurn(opponent);
      } else if (myMoveCount > 0) {
        alert("パス！");
      } else {
        if (nextBlackCount > nextWhiteCount) {
          setWinner("BLACK");
        } else if (nextWhiteCount > nextBlackCount) {
          setWinner("WHITE");
        } else {
          setWinner("DRAW");
        }
      }
    }
  };

  const handleReset = () => {
    setBoard(createInitialBoard());
    setTurn("BLACK");
    setWinner(null);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 font-sans text-white">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black tracking-widest mb-6">Othello</h1>
        <div className="flex items-center justify-center gap-4">
          <div
            className={`px-4 py-2 rounded ${turn === "BLACK" ? "bg-black ring-2 ring-white" : "opacity-50"}`}
          >
            BLACK {blackCount}
          </div>
          <div
            className={`px-4 py-2 rounded ${turn === "WHITE" ? "bg-white ring-2 text-black ring-black" : "opacity-50"}`}
          >
            WHITE {whiteCount}
          </div>
        </div>
      </div>

      <Board
        board={board}
        validMoves={currentValidMoves}
        onCellClick={handleCellClick}
      />
      {winner && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <h2 className="text-6xl font-black mb-4">
            {winner === "DRAW" ? "DRAW!" : `WINNER: ${winner}!`}
          </h2>
          <div className="text-2xl mb-4">
            BLACK: {blackCount} WHITE: {whiteCount}
          </div>
          <button
            onClick={handleReset}
            className="px-8 py-4 bg-white text-black font-bold hover:scale-110 transition-transform"
          >
            Play again?
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
