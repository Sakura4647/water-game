import React, { useEffect, useState } from 'react';

interface CountdownOverlayProps {
  onComplete: () => void;
}

const CountdownOverlay: React.FC<CountdownOverlayProps> = ({ onComplete }) => {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  if (count <= 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-wood-900/40 backdrop-blur-sm">
      <div key={count} className="text-9xl font-black text-white drop-shadow-lg animate-ping">
        {count}
      </div>
    </div>
  );
};

export default CountdownOverlay;