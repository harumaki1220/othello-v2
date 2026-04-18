import { useState } from "react";
import { Board } from "./components/Board";
import { putDisc, getOpponent, createInitialBoard } from "./logic/board";

function App() {
  const [board, setBoard] = useState(createInitialBoard());
  const [turn, setTurn] = useState<"BLACK" | "WHITE">("BLACK");

  const handleCellClick = (x: number, y: number) => {
    const nextBoard = putDisc(board, turn, x, y);

    if (nextBoard) {
      setBoard(nextBoard);
      setTurn(getOpponent(turn));
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 font-sans text-white">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black tracking-widest mb-6">Othello</h1>
        <div className="flex items-center justify-center gap-4">
          <div
            className={`px-4 py-2 rounded ${turn === "BLACK" ? "bg-black ring-2 ring-white" : "opacity-50"}`}
          >
            BLACK
          </div>
          <div
            className={`px-4 py-2 rounded text-black ${turn === "WHITE" ? "bg-white ring-2 ring-black" : "opacity-50"}`}
          >
            WHITE
          </div>
        </div>
      </div>

      <Board board={board} onCellClick={handleCellClick} />
    </div>
  );
}

export default App;
