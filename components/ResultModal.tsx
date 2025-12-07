import React from 'react';
import { ScoreResult, ScoreRule } from '../types';
import { SCORING_RULES } from '../constants';

interface ResultModalProps {
  result: ScoreResult;
  seconds: number;
  onRestart: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ result, seconds, onRestart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wood-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-8 flex-1">
            <div className="text-center">
                {/* Icon */}
                <div className="text-7xl mb-6 inline-block filter drop-shadow-md">💧</div>

                {/* Time & Score Box */}
                <div className="mb-8">
                    <p className="text-wood-500 text-sm font-bold tracking-widest uppercase mb-2">維持時間</p>
                    <h2 className="text-5xl font-black text-wood-900 tracking-tight mb-2">
                        {seconds} <span className="text-2xl text-wood-400">秒</span>
                    </h2>
                    <div className="inline-block bg-wood-50 px-6 py-2 rounded-full border border-wood-100">
                        <span className="text-wood-600 font-bold text-xl mr-2">得分</span>
                        <span className="text-3xl font-black text-water-dark">{result.score}</span>
                        <span className="text-wood-600 font-bold text-xl ml-1">分</span>
                    </div>
                </div>

                {/* Feedback Message */}
                <div className="bg-sky-50 p-6 rounded-2xl border-2 border-sky-100 mb-8">
                    <h3 className="text-2xl font-bold text-water-dark mb-2 tracking-wide">
                        {result.message}
                    </h3>
                    <p className="text-wood-700 font-medium text-base md:text-lg">
                        {result.subMessage}
                    </p>
                </div>

                {/* Scoring Rules Table */}
                <div className="text-left bg-wood-50 p-5 rounded-xl border border-wood-100">
                    <h4 className="text-sm font-bold text-wood-500 mb-3 pb-2 border-b border-wood-200 tracking-wider flex items-center gap-2">
                        <span>📊</span> 計分方式
                    </h4>
                    <div className="space-y-3">
                        {SCORING_RULES.map((rule, idx) => (
                            <div key={idx} className={`flex flex-col sm:flex-row sm:items-center text-sm gap-1 sm:gap-2 ${result.score === rule.score ? 'bg-white p-2 rounded-lg shadow-sm -mx-2 border border-water-main/30' : 'opacity-70'}`}>
                                <div className="flex justify-between sm:w-1/2 gap-2">
                                    <span className="font-bold text-wood-800">{rule.rangeLabel}</span>
                                    <span className="font-bold text-water-dark shrink-0">得{rule.score}分</span>
                                </div>
                                <div className="hidden sm:block text-wood-300">→</div>
                                <span className="text-wood-600 font-medium">{rule.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Footer / Button */}
        <div className="p-6 bg-white border-t border-wood-100">
            <button
            onClick={onRestart}
            className="w-full bg-water-main hover:bg-sky-300 active:bg-water-dark text-white font-bold text-xl py-4 rounded-xl shadow-md transition-all duration-200 transform active:scale-[0.98] tracking-widest"
            >
            再來一次
            </button>
        </div>

      </div>
    </div>
  );
};

export default ResultModal;
