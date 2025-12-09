import React, { useState } from 'react';
import { RULES } from '../constants';

interface GameScreenProps {
  seconds: number;
  onFinish: () => void;
  onRestart: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ seconds, onFinish, onRestart }) => {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Top Bar - Fixed White Bar Style */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur shadow-md border-b border-wood-300 h-16 px-4 flex justify-between items-center">
        {/* Left: Timer */}
        <div className="flex items-center gap-2 text-wood-400 font-bold text-2xl font-mono opacity-80">
          <span>⏱</span>
          <span>{seconds} s</span>
        </div>

        {/* Right: Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => setShowRules(true)}
            className="border-2 border-wood-600 text-wood-600 font-bold rounded-lg px-4 py-1 hover:bg-wood-100 transition-colors text-base"
          >
            規則
          </button>
          <button 
            onClick={onRestart}
            className="bg-wood-600 text-white font-bold rounded-lg px-4 py-1 hover:bg-wood-700 transition-colors text-base"
          >
            重來
          </button>
        </div>
      </div>

      {/* Center Display */}
      {/* Added pt-16 to account for the fixed header height */}
      <div className="flex-1 flex flex-col items-center justify-center pt-16 z-10 w-full text-center">
        {/* Instructions */}
        <div className="mb-12">
           <p className="text-wood-600 text-xl md:text-2xl font-bold tracking-wider leading-relaxed">
             請雙手合十<br/>
             單腳站立並閉上眼睛
           </p>
        </div>
        
        {/* Big Timer */}
        <div className="flex flex-col items-center">
            <span className="text-wood-400 font-bold text-xl mb-4 tracking-widest">維持時間</span>
            <div className="flex items-baseline justify-center leading-none">
                <span className="text-[8rem] md:text-[10rem] font-black text-wood-800 tabular-nums tracking-tighter drop-shadow-sm">
                    {seconds}
                </span>
                <span className="text-4xl text-wood-300 font-bold ml-3">s</span>
            </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="w-full flex justify-center pb-12 px-6 z-10">
        <button
          onClick={onFinish}
          className="w-full max-w-md bg-water-main hover:bg-sky-300 active:bg-water-dark transition-all duration-150 text-white font-bold text-2xl py-5 rounded-2xl shadow-lg border-b-4 border-water-dark active:border-b-0 active:translate-y-1 tracking-widest"
        >
          遊戲結束
        </button>
      </div>

      {/* Background Decor (Optional, keeping subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-wood-100 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-50 rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

      {/* Rules Modal Overlay (Local State) */}
      {showRules && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wood-900/60 backdrop-blur-sm animate-fade-in">
             <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative">
                 <button 
                    onClick={() => setShowRules(false)}
                    className="absolute top-4 right-4 text-wood-400 hover:text-wood-700 transition-colors p-1"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 </button>
                 
                 <div className="text-center mt-2 mb-6 px-2">
                    <p className="text-wood-700 font-bold text-xl tracking-wider mb-2">腎為先天之本</p>
                    <p className="text-wood-600 text-base font-medium leading-relaxed">
                        水行對應臟腑為腎與膀胱，與骨骼、平衡與穩定有關。
                    </p>
                 </div>

                 <h3 className="text-xl font-bold text-wood-800 mb-4 text-center border-b border-wood-100 pb-3 tracking-widest">📜 遊戲規則</h3>
                 <ul className="space-y-4">
                    {RULES.map((rule, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 font-bold text-water-main text-lg">
                          {index === 0 ? '①' : index === 1 ? '②' : '③'}
                        </span>
                        <span className="text-wood-700 font-medium text-base leading-snug">
                          {rule}
                        </span>
                      </li>
                    ))}
                 </ul>
            </div>
        </div>
      )}

    </div>
  );
};

export default GameScreen;