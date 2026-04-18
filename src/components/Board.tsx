import type { Board as BoardType, Position } from "../types/othello";

type Props = {
  board: BoardType;
  validMoves: Position[];
  onCellClick: (x: number, y: number) => void;
};

export const Board = ({ board, validMoves, onCellClick }: Props) => {
  return (
    <div className="inline-block bg-green-700 p-2 shadow-2xl rounded-sm">
      {board.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => {
            const isHighlight = validMoves.some((p) => p.x === x && p.y === y);

            return (
              <button
                key={`${x}-${y}`}
                onClick={() => onCellClick(x, y)}
                className={`flex h-12 w-12 items-center justify-center border border-green-800 transition-colors focus:outline-none ${
                  isHighlight
                    ? "bg-green-500 cursor-pointer"
                    : "hover:bg-green-600"
                }`}
              >
                {cell !== "EMPTY" && (
                  <div
                    className={`h-10 w-10 rounded-full shadow-lg transition-all duration-300 ${
                      cell === "BLACK" ? "bg-black" : "bg-white"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
