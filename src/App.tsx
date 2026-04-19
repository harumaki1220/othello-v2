import { useOthello } from "./hooks/useOthello";
import { Board } from "./components/Board";

function App() {
  const {
    board,
    turn,
    winner,
    currentValidMoves,
    blackCount,
    whiteCount,
    isPass,
    dismissPass,
    handleCellClick,
    handleReset,
  } = useOthello();

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
      {isPass && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="text-6xl font-black mb-8 text-red-400">パス!</div>
          <button
            onClick={dismissPass}
            className="px-8 py-4 bg-white text-black font-bold hover:scale-110 transition-transform"
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
