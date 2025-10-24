import { useState, useEffect } from 'react';
import { Leaderboard } from '../Leaderboard/Leaderboard';

const Comet = ({ delay = 0, duration = 3, startX = -100, endX = 1200, startY = 0, endY = 200 }) => {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        animation: `comet-fly ${duration}s linear ${delay}s infinite`,
        '--start-x': `${startX}px`,
        '--end-x': `${endX}px`,
        '--start-y': `${startY}px`,
        '--end-y': `${endY}px`,
      } as React.CSSProperties}
    >
      {/* Comet head */}
      <div className="relative">
        {/* Bright core */}
        <div className="w-4 h-4 bg-white rounded-full shadow-lg shadow-blue-400/70 animate-pulse relative z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-white rounded-full animate-pulse"></div>
        </div>
        
        {/* Multiple tail layers for depth */}
        <div className="absolute top-1.5 left-1.5 w-16 h-0.5 bg-gradient-to-r from-white via-yellow-300 to-transparent opacity-90 transform rotate-45 origin-left blur-sm"></div>
        <div className="absolute top-1 left-1 w-20 h-1 bg-gradient-to-r from-blue-200 via-purple-300 to-transparent opacity-70 transform rotate-45 origin-left blur-sm"></div>
        <div className="absolute top-2 left-2 w-12 h-0.5 bg-gradient-to-r from-orange-300 via-red-300 to-transparent opacity-80 transform rotate-45 origin-left"></div>
        <div className="absolute top-0.5 left-0.5 w-24 h-1.5 bg-gradient-to-r from-cyan-200 via-blue-400 to-transparent opacity-50 transform rotate-45 origin-left blur-md"></div>
        
        {/* Sparkle effects */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-3 left-3 w-1 h-1 bg-yellow-300 rounded-full opacity-80 animate-pulse"></div>
      </div>
    </div>
  );
};

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const getScoreMessage = (score: number) => {
  if (score >= 90) return {
    title: "LEGENDARY JEDI MASTER! 🌟",
    message: "The Force is incredibly strong with you! The galaxy is safe thanks to your heroic cleanup efforts.",
    character: "Master Yoda would be proud. Clean up the galaxy, you did!"
  };
  if (score >= 75) return {
    title: "JEDI KNIGHT! ⚔️",
    message: "Excellent work, young Padawan! Your dedication to cleaning up Imperial debris is commendable.",
    character: "Obi-Wan: 'You have done well, my young apprentice.'"
  };
  if (score >= 50) return {
    title: "REBEL PILOT! 🚀",
    message: "Good job cleaning up the battlefield! The Rebellion needs more pilots like you.",
    character: "Leia: 'The Rebellion thanks you for your service.'"
  };
  if (score >= 25) return {
    title: "REBEL RECRUIT! 👨‍🚀",
    message: "Not bad for a beginner! Keep training and you'll become a great rebel.",
    character: "Han Solo: 'Kid, you've got potential.'"
  };
  return {
    title: "MOISTURE FARMER... 🌾",
    message: "Well, at least you tried! Even Luke started as a moisture farmer on Tatooine.",
    character: "Uncle Owen: 'These droids work harder than you do!'"
  };
};

export const GameOver = ({ score, onRestart }: GameOverProps) => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  
  const scoreData = getScoreMessage(score);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase(1), 500);
    const timer2 = setTimeout(() => setAnimationPhase(2), 1500);
    const timer3 = setTimeout(() => setAnimationPhase(3), 2500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (showLeaderboard) {
    return <Leaderboard currentScore={score} onRestart={onRestart} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-yellow-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* CSS Animation Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes comet-fly {
            0% {
              transform: translate(var(--start-x), var(--start-y)) rotate(45deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translate(var(--end-x), var(--end-y)) rotate(45deg);
              opacity: 0;
            }
          }
          
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `
      }} />

      {/* Flying Comets - Multiple waves */}
      <Comet delay={0} duration={4} startX={-100} endX={1400} startY={50} endY={300} />
      <Comet delay={1.5} duration={3.5} startX={-80} endX={1200} startY={150} endY={400} />
      <Comet delay={3} duration={4.5} startX={-120} endX={1300} startY={80} endY={350} />
      <Comet delay={4.5} duration={3} startX={-90} endX={1100} startY={200} endY={450} />
      <Comet delay={6} duration={4} startX={-110} endX={1250} startY={30} endY={280} />
      <Comet delay={2.5} duration={3.8} startX={-70} endX={1150} startY={120} endY={380} />
      
      {/* Second wave of comets */}
      <Comet delay={8} duration={3.2} startX={-95} endX={1350} startY={70} endY={320} />
      <Comet delay={9.5} duration={4.2} startX={-85} endX={1180} startY={180} endY={420} />
      <Comet delay={11} duration={3.7} startX={-105} endX={1280} startY={40} endY={290} />
      
      {/* Reverse direction comets (from right to left) */}
      <Comet delay={7} duration={3.5} startX={1400} endX={-100} startY={100} endY={350} />
      <Comet delay={10} duration={4} startX={1300} endX={-120} startY={60} endY={310} />
      
      {/* Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => {
          const size = Math.random() > 0.7 ? 'w-2 h-2' : 'w-1 h-1';
          const color = Math.random() > 0.8 ? 'bg-yellow-300' : Math.random() > 0.6 ? 'bg-blue-200' : 'bg-white';
          return (
            <div
              key={i}
              className={`absolute ${size} ${color} rounded-full`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${1.5 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
              }}
            />
          );
        })}
      </div>

      {/* Distant galaxies/nebulae effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-radial from-purple-500/30 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-20 bg-gradient-radial from-pink-500/25 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
        {/* Star Wars opening crawl style */}
        <div className="relative overflow-hidden h-32">
          <div className={`absolute inset-0 transition-all duration-1000 ${animationPhase >= 1 ? 'transform -translate-y-0 opacity-100' : 'transform translate-y-full opacity-0'}`}>
            <div className="text-6xl font-bold text-yellow-300 mb-4 animate-pulse">
              MISSION COMPLETE
            </div>
          </div>
        </div>

        {/* Score display */}
        <div className={`transition-all duration-1000 delay-500 ${animationPhase >= 2 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
          <div className="bg-gray-900 border-2 border-yellow-400 rounded-lg p-6 mb-6">
            <h2 className="text-3xl font-bold text-yellow-300 mb-2">{scoreData.title}</h2>
            <div className="text-6xl font-bold text-white mb-4">{score}</div>
            <div className="text-lg mb-4">{scoreData.message}</div>
            <div className="text-sm italic text-gray-400 border-l-4 border-yellow-600 pl-4">
              {scoreData.character}
            </div>
          </div>
        </div>

        {/* Fun stats */}
        <div className={`transition-all duration-1000 delay-1000 ${animationPhase >= 3 ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800 border border-yellow-600 rounded p-4">
              <div className="text-2xl font-bold text-yellow-300">{score}</div>
              <div className="text-sm">Imperial Debris Cleared</div>
            </div>
            <div className="bg-gray-800 border border-yellow-600 rounded p-4">
              <div className="text-2xl font-bold text-yellow-300">{Math.round(score * 1.5)}</div>
              <div className="text-sm">Credits Earned</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button
              onClick={() => setShowLeaderboard(true)}
              className="w-full px-6 py-3 bg-yellow-600 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              📊 View Alliance Leaderboard
            </button>
            
            <button
              onClick={onRestart}
              className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors"
            >
              🚀 Start New Cleanup Mission
            </button>
          </div>

          {/* Easter egg messages */}
          <div className="mt-6 text-xs text-gray-500 space-y-1">
            <p>🌟 "Do or do not, there is no try." - Master Yoda</p>
            <p>⚔️ May the Force be with you, always.</p>
            {score === 66 && <p className="text-red-400">🔥 Execute Order 66... wait, wrong mission!</p>}
            {score === 100 && <p className="text-green-400">🎉 Perfect score! You are the chosen one!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};