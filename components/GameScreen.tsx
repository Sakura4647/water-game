import React from 'react';

interface GameScreenProps {
  seconds: number;
  onFinish: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ seconds, onFinish }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 relative overflow-hidden">
      
      {/* Top Bar */}
      <div className="w-full flex justify-center pt-8 z-10">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-wood-200 shadow-sm">
          <span className="text-xl">💧</span>
          <span className="text-wood-600 font-bold tracking-widest text-sm md:text-base">平衡測試中</span>
        </div>
      </div>

      {/* Center Display */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full text-center">
        <p className="text-wood-500 font-medium text-lg md:text-xl mb-8 tracking-wider animate-pulse-slow">
          請保持單腳站立與閉眼<br/>維持身體穩定
        </p>
        
        <div className="relative">
             {/* Decorative Ring */}
            <div className="absolute inset-0 -m-8 rounded-full border-4 border-wood-100 opacity-50 animate-ping" style={{ animationDuration: '3s' }}></div>
            
            <div className="text-[7rem] md:text-[9rem] font-black text-wood-900 leading-none tabular-nums tracking-tighter drop-shadow-sm">
            {seconds}
            <span className="text-4xl md:text-6xl text-wood-400 font-bold ml-2">s</span>
            </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="w-full max-w-md pb-8 z-10">
        <button
          onClick={onFinish}
          className="w-full bg-water-main hover:bg-sky-300 active:bg-water-dark transition-all duration-150 text-white font-bold text-2xl py-5 rounded-2xl shadow-lg border-b-4 border-water-dark active:border-b-0 active:translate-y-1 tracking-widest"
        >
          遊戲結束
        </button>
      </div>

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-wood-100 rounded-full blur-3xl mix-blend-multiply"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-50 rounded-full blur-3xl mix-blend-multiply"></div>
      </div>

    </div>
  );
};

export default GameScreen;
