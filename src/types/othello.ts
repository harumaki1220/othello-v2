export type Disc = "BLACK" | "WHITE" | "EMPTY";

export type Position = {
  x: number;
  y: number;
};

// board[y][x]
export type Board = Disc[][];
