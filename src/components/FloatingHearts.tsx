import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Generate hearts with randomized properties
    const generateHearts = () => {
      const newHearts: Heart[] = [];
      const heartCount = 15; // Minimal, classy amount

      for (let i = 0; i < heartCount; i++) {
        newHearts.push({
          id: i,
          left: Math.random() * 100, // Random horizontal position
          size: 8 + Math.random() * 12, // Size variance 8-20px
          duration: 15 + Math.random() * 20, // 15-35 seconds
          delay: Math.random() * 20, // Staggered start
          drift: (Math.random() - 0.5) * 100, // Left/right drift
          opacity: 0.15 + Math.random() * 0.25, // Semi-transparent
        });
      }
      setHearts(newHearts);
    };

    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-heart-float"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            '--duration': `${heart.duration}s`,
            '--delay': `${heart.delay}s`,
            '--drift': `${heart.drift}px`,
            opacity: heart.opacity,
          } as React.CSSProperties}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-primary"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
