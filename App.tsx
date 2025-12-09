import React, { useState, useEffect, useRef, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultModal from './components/ResultModal';
import CountdownOverlay from './components/CountdownOverlay';
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

  // Start logic: User clicks start -> Go to Countdown
  const handleStartGame = useCallback(() => {
    setSeconds(0);
    setGameState(GameState.COUNTDOWN);
  }, []);

  // Countdown Complete logic: Countdown finishes -> Go to Playing and Start Timer
  const handleCountdownComplete = useCallback(() => {
    setGameState(GameState.PLAYING);
    
    // Start Timer
    timerRef.current = window.setInterval(() => {
      setSeconds((prev) => {
        const next = prev + 1;
        // Auto finish if max time reached
        if (next >= MAX_TIME) {
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
    stopTimer();
    setGameState(GameState.START);
    setSeconds(0);
  }, [stopTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  // Calculate Score Helper
  const getResult = (sec: number): ScoreResult => {
    let score = 1;
    let message = '';
    let subMessage = '';
    
    // Logic: 
    // > 30 (31+) -> 3 pts
    // 16-30 -> 2 pts
    // 0-15 -> 1 pt
    
    if (sec > 30) {
      score = 3;
      message = SCORING_RULES[0].description; 
      subMessage = "站得很好，保持這份穩定！";
    } else if (sec > 15) {
      score = 2;
      message = SCORING_RULES[1].description;
      subMessage = "慢慢來，穩定會越來越進步。";
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

      {(gameState === GameState.PLAYING || gameState === GameState.COUNTDOWN) && (
        <GameScreen 
          seconds={seconds} 
          onFinish={handleFinishGame} 
          onRestart={handleRestart}
        />
      )}
      
      {gameState === GameState.COUNTDOWN && (
        <CountdownOverlay onComplete={handleCountdownComplete} />
      )}

      {gameState === GameState.RESULT && (
        <>
           <GameScreen 
             seconds={seconds} 
             onFinish={() => {}} 
             onRestart={handleRestart}
           />
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