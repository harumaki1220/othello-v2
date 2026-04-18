import type { Board, Position } from "../types/othello";

const DIRECTIONS = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

export const getOpponent = (color: "BLACK" | "WHITE"): "BLACK" | "WHITE" => {
  return color === "BLACK" ? "WHITE" : "BLACK";
};

export const putDisc = (
  board: Board,
  color: "BLACK" | "WHITE",
  x: number,
  y: number,
): Board | null => {
  if (board[y][x] !== "EMPTY") return null;

  const newBoard = structuredClone(board);
  let canFlip = false;

  for (const [dy, dx] of DIRECTIONS) {
    const opponentColor = getOpponent(color);
    let step = 1;

    while (
      y + dy * step >= 0 &&
      y + dy * step <= 7 &&
      x + dx * step >= 0 &&
      x + dx * step <= 7 &&
      board[y + dy * step][x + dx * step] === opponentColor
    ) {
      step += 1;
    }

    const nx = x + dx * step;
    const ny = y + dy * step;

    if (
      ny >= 0 &&
      ny <= 7 &&
      nx >= 0 &&
      nx <= 7 &&
      board[ny][nx] === color &&
      step > 1
    ) {
      canFlip = true;

      for (let i = 1; i < step; i++) {
        newBoard[y + dy * i][x + dx * i] = color;
      }
    }
  }

  if (!canFlip) return null;

  newBoard[y][x] = color;

  return newBoard;
};

export const createInitialBoard = (): Board => {
  const board: Board = Array.from({ length: 8 }, () => Array(8).fill("EMPTY"));

  // オセロの初期配置
  board[3][3] = "WHITE";
  board[3][4] = "BLACK";
  board[4][3] = "BLACK";
  board[4][4] = "WHITE";

  return board;
};

export const getValidMoves = (
  board: Board,
  color: "BLACK" | "WHITE",
): Position[] => {
  const validMoves: Position[] = [];

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (putDisc(board, color, x, y) !== null) {
        validMoves.push({ x, y });
      }
    }
  }

  return validMoves;
};
