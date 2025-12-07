import React, { useState, useEffect, useRef, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultModal from './components/ResultModal';
import { GameState, ScoreResult } from './types';
import { MAX_TIME, SCORING_RULES } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [seconds, setSeconds] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  // Clear timer helper
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Start game logic
  const handleStartGame = useCallback(() => {
    setSeconds(0);
    setGameState(GameState.PLAYING);
    
    // Start Timer
    timerRef.current = window.setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;
        // Auto finish if max time reached
        if (next >= MAX_TIME) {
          // We need to stop timer and show result, but we cannot call handleFinishGame directly here easily
          // because it relies on the state. 
          // Instead, we'll let the effect below handle the transition or just call a ref-stable function.
          // For simplicity in this loop, we just increment. The useEffect will catch the max time.
          return next;
        }
        return next;
      });
    }, 1000);
  }, []);

  // Watch for Max Time
  useEffect(() => {
    if (gameState === GameState.PLAYING && seconds >= MAX_TIME) {
      handleFinishGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, gameState]);

  // Finish game logic
  const handleFinishGame = useCallback(() => {
    stopTimer();
    setGameState(GameState.RESULT);
  }, [stopTimer]);

  // Restart game logic
  const handleRestart = useCallback(() => {
    setGameState(GameState.START);
    setSeconds(0);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  // Calculate Score Helper
  const getResult = (sec: number): ScoreResult => {
    let score = 1;
    let message = '';
    let subMessage = '';

    // Determine Score and Message based on rules
    // Rule 1: > 31s (which implies >= 31 in integer terms if max is 35, basically > 30)
    // The prompt says "超过 31秒" (Exceed 31s) -> 32, 33, 34, 35. 
    // However, the rule text "可站立超過31秒 | 得3分" usually implies hitting that tier.
    // Let's look at the mapping logic in prompt: 
    // "可站立超過 31秒" -> 3分. 
    // "21～30 秒" -> 2分.
    // "0～20 秒" -> 1分.
    // There is a slight gap for '31'. Let's assume >= 31 is 3 points.
    
    if (sec >= 31) {
      score = 3;
      message = SCORING_RULES[0].description; 
      subMessage = "你的身心都站得很安穩！";
    } else if (sec >= 21) {
      score = 2;
      message = SCORING_RULES[1].description;
      subMessage = "有不錯的平衡感，會越來越穩！";
    } else {
      score = 1;
      message = SCORING_RULES[2].description;
      subMessage = "給自己多一點休息，慢慢來就好！";
    }

    return { score, message, subMessage };
  };

  return (
    <div className="relative min-h-screen font-sans text-wood-900 selection:bg-water-main selection:text-white">
      {gameState === GameState.START && (
        <StartScreen onStart={handleStartGame} />
      )}

      {gameState === GameState.PLAYING && (
        <GameScreen seconds={seconds} onFinish={handleFinishGame} />
      )}

      {gameState === GameState.RESULT && (
        <>
           {/* We keep GameScreen in background for visual continuity or just an overlay? 
               Usually modals overlay the previous screen. Let's overlay GameScreen.
           */}
           <GameScreen seconds={seconds} onFinish={() => {}} />
           <ResultModal 
             seconds={seconds} 
             result={getResult(seconds)} 
             onRestart={handleRestart} 
           />
        </>
      )}
    </div>
  );
};

export default App;
