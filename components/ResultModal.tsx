import React from 'react';
import { ScoreResult } from '../types';
import { SCORING_RULES } from '../constants';

interface ResultModalProps {
  result: ScoreResult;
  seconds: number;
  onRestart: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ result, seconds, onRestart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wood-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden p-6 text-center relative">
        {/* Close X Button */}
        <button 
            onClick={onRestart}
            className="absolute top-4 right-4 text-wood-400 hover:text-wood-700 transition-colors p-2 rounded-full hover:bg-wood-100"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <div className="text-7xl mb-4">💧</div>
        <div className="mb-4">
            <p className="text-wood-600 mb-1 font-bold tracking-wider text-lg">維持時間</p>
            <p className="text-3xl font-black text-wood-900 tracking-wide">
                {seconds} <span className="text-xl text-wood-500 font-bold">秒</span>
            </p>
        </div>
        
        <div className="bg-wood-50 p-4 rounded-xl border-2 border-wood-200 mb-4">
            <h3 className="text-2xl font-bold text-water-main mb-2 tracking-wider">
                {result.message}
            </h3>
            <p className="text-wood-700 text-base mb-3 font-medium tracking-wide">
                {result.subMessage}
            </p>
            <div className="flex justify-center items-center gap-1 text-wood-400 text-base font-bold bg-white py-2 rounded-lg border border-wood-100">
                <span>得分：</span>
                <span className="text-3xl text-wood-800">{result.score}</span>
                <span>分</span>
            </div>
        </div>
        
        {/* Scoring Table */}
        <div className="text-left mb-6">
            <h4 className="text-base font-bold text-wood-500 mb-2 border-b border-wood-100 pb-1 tracking-wider">🏅 計分方式</h4>
            <div className="space-y-2 text-sm text-wood-700 tracking-wide">
                {SCORING_RULES.map((rule, idx) => (
                    <div key={idx} className="flex justify-between items-center whitespace-nowrap gap-2">
                        <span className="font-bold text-water-main">{rule.rangeLabel}</span>
                        <span className="font-bold">{rule.score}分</span>
                        <span className="text-right flex-1 text-wood-500 overflow-hidden text-ellipsis">{rule.description}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="flex flex-col gap-3">
            <button 
                onClick={onRestart}
                className="w-full font-bold rounded-lg transition-all duration-200 shadow-sm active:scale-95 flex items-center justify-center gap-2 bg-water-main hover:bg-sky-400 text-white shadow-sky-200 px-6 py-2 text-lg tracking-widest"
            >
                再來一次
            </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;