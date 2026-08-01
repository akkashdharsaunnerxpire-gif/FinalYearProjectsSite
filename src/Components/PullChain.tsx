import { useState } from 'react';
import { useTheme } from '../Context/ThemeContext';

export default function PullChain() {
  const { theme, toggleTheme } = useTheme();
  const [isPulling, setIsPulling] = useState(false);

  const handlePull = () => {
    setIsPulling(true);
    toggleTheme(); // Theme Toggle ஆகும்

    // Click Sound Effect
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (e) {
      // Audio error ignore
    }

    setTimeout(() => {
      setIsPulling(false);
    }, 400);
  };

  return (
    <div className="fixed top-0 right-8 z-50 flex flex-col items-center">
      {/* Chain String */}
      <div
        className={`w-1 bg-gradient-to-b from-yellow-600 via-amber-400 to-yellow-600 transition-all duration-300 ${
          isPulling ? 'h-36' : 'h-24 md:h-28'
        }`}
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #d97706, #d97706 4px, #f59e0b 4px, #f59e0b 8px)',
        }}
      />

      {/* Chain Handle / Bulb */}
      <button
        onClick={handlePull}
        title="Pull to toggle site theme"
        className={`w-7 h-7 rounded-full bg-amber-400 border-2 border-amber-200 shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${
          isPulling ? 'translate-y-3' : 'translate-y-0'
        } ${theme === 'light' ? 'shadow-[0_0_15px_rgba(251,191,36,0.8)]' : ''}`}
      >
        <div className="w-2 h-2 rounded-full bg-amber-100" />
      </button>
    </div>
  );
}