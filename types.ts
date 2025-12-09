export enum GameState {
  START = 'START',
  COUNTDOWN = 'COUNTDOWN',
  PLAYING = 'PLAYING',
  RESULT = 'RESULT',
}

export interface ScoreResult {
  score: number;
  message: string;
  subMessage: string;
}

export interface ScoreRule {
  rangeLabel: string;
  score: number;
  description: string;
}