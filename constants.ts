import { ScoreRule } from './types';

export const MAX_TIME = 35; // Maximum time in seconds before auto-finish

export const SCORING_RULES: ScoreRule[] = [
  {
    rangeLabel: '可站立超過31秒',
    score: 3,
    description: '腎氣充盈，穩若靜水',
  },
  {
    rangeLabel: '站立21~30秒之間',
    score: 2,
    description: '腎氣不錯，靜中帶穩',
  },
  {
    rangeLabel: '站立0~20秒',
    score: 1,
    description: '腎氣偏弱，需多調養',
  },
];

export const GAME_TITLE = "水之定立，金雞獨立";
export const GAME_DESCRIPTION_MAIN = "腎為先天之本，腎氣充盈則穩如靜水。";
export const GAME_DESCRIPTION_SUB = "水行對應臟腑為腎與膀胱，與骨骼、平衡與穩定有關。";

export const RULES = [
  "雙手合十（拿著手機）於胸前，單腳站立",
  "按下遊戲開始後，並閉上眼睛，保持身體穩定",
  "當支撐腳移動或失去平衡時，結束計時",
];
