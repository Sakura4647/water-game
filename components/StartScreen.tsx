import React from 'react';
import { GAME_TITLE, GAME_DESCRIPTION_MAIN, GAME_DESCRIPTION_SUB, RULES } from '../constants';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border-2 border-wood-300 text-center animate-fade-in">
        
        {/* Icon - Static, no animation */}
        <div className="mb-6">
          <span className="text-6xl drop-shadow-md">💧</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-black text-wood-900 mb-8 tracking-widest">
          {GAME_TITLE}
        </h1>

        {/* Description Box */}
        <div className="bg-wood-50 p-6 rounded-xl border border-wood-200 text-left mb-8 shadow-inner">
          <p className="text-wood-700 mb-3 font-bold text-lg tracking-wide leading-relaxed">
            {GAME_DESCRIPTION_MAIN}
          </p>
          <p className="text-base text-wood-600 leading-relaxed font-medium">
            {GAME_DESCRIPTION_SUB}
          </p>
        </div>

        {/* Rules Box */}
        <div className="mb-8 text-left">
          <h2 className="text-xl font-bold text-wood-800 mb-4 border-b-2 border-wood-200 pb-2 flex items-center gap-2 tracking-wider">
            <span>📜</span> 遊戲規則
          </h2>
          <ul className="space-y-4">
            {RULES.map((rule, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 font-bold text-water-main text-xl">
                  {index === 0 ? '①' : index === 1 ? '②' : '③'}
                </span>
                <span className="text-wood-800 font-medium text-base md:text-lg leading-snug">
                  {rule}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full bg-water-main hover:bg-sky-300 active:bg-water-dark transition-colors duration-200 text-white font-bold text-2xl py-4 rounded-xl shadow-lg hover:shadow-xl transform active:scale-[0.98] tracking-widest"
        >
          開始遊戲
        </button>

      </div>
    </div>
  );
};

export default StartScreen;