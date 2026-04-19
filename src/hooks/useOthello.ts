import { useState } from "react";
import {
  createInitialBoard,
  getValidMoves,
  putDisc,
  getOpponent,
} from "../logic/board";

export const useOthello = () => {
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

  return {
    board,
    turn,
    winner,
    currentValidMoves,
    blackCount,
    whiteCount,
    handleCellClick,
    handleReset,
  };
};
