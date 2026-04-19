export type Disc = "BLACK" | "WHITE" | "EMPTY";

export type Player = "BLACK" | "WHITE";

export type Winner = Player | "DRAW" | null;

export type Position = {
  x: number;
  y: number;
};

// board[y][x]
export type Board = Disc[][];
