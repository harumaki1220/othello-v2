import { useState } from "react";
import {
  createInitialBoard,
  getValidMoves,
  putDisc,
  getOpponent,
} from "../logic/board";
import type { Winner, Player } from "../types/othello";

export const useOthello = () => {
  const [board, setBoard] = useState(createInitialBoard());
  const [turn, setTurn] = useState<Player>("BLACK");
  const [winner, setWinner] = useState<"BLACK" | "WHITE" | "DRAW" | null>(null);

  const currentValidMoves = getValidMoves(board, turn);
  const blackCount = board.flat().filter((cell) => cell === "BLACK").length;
  const whiteCount = board.flat().filter((cell) => cell === "WHITE").length;

  const handleCellClick = (x: number, y: number) => {
    const nextBoard = putDisc(board, turn, x, y);
    if (!nextBoard) return;

    const opponent = getOpponent(turn);
    const opponentMoveCount = getValidMoves(nextBoard, opponent).length;
    const myMoveCount = getValidMoves(nextBoard, turn).length;

    let nextTurn = opponent; // 基本は相手のターン
    let nextWinner: Winner = null;

    if (opponentMoveCount === 0 && myMoveCount === 0) {
      const nextBlackCount = nextBoard
        .flat()
        .filter((c) => c === "BLACK").length;
      const nextWhiteCount = nextBoard
        .flat()
        .filter((c) => c === "WHITE").length;

      if (nextBlackCount > nextWhiteCount) {
        nextWinner = "BLACK";
      } else if (nextWhiteCount > nextBlackCount) {
        nextWinner = "WHITE";
      } else {
        nextWinner = "DRAW";
      }
    } else if (opponentMoveCount === 0 && myMoveCount > 0) {
      nextTurn = turn; // ターンを自分に戻す
      alert("パス!");
    }

    setBoard(nextBoard);
    setTurn(nextTurn);
    setWinner(nextWinner);
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
