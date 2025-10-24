import { useEffect, useState } from 'react';

interface GameOverAnimationProps {
    score: number;
    onAnimationComplete: () => void;
}

export const GameOverAnimation = ({ score, onAnimationComplete }: GameOverAnimationProps) => {
    const [phase, setPhase] = useState(0);
    const [showExplosion, setShowExplosion] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setPhase(1), 500);
        const timer2 = setTimeout(() => setShowExplosion(true), 1000);
        const timer3 = setTimeout(() => setPhase(2), 1500);
        const timer4 = setTimeout(() => setPhase(3), 2500);
        const timer5 = setTimeout(() => onAnimationComplete(), 4000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
            clearTimeout(timer5);
        };
    }, [onAnimationComplete]);

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-orange-400 via-red-500 to-purple-900 flex items-center justify-center z-50 overflow-hidden">
            {/* Meteor shower background */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-20 bg-gradient-to-b from-yellow-300 to-transparent animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `-20px`,
                            animationDelay: `${Math.random() * 2}s`,
                            transform: `rotate(45deg)`,
                            animation: `meteorFall 3s linear infinite ${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="text-center z-10">
                {/* Giant T-Rex appears */}
                <div className={`transition-all duration-1000 ${phase >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                    <div className="text-9xl mb-4 animate-bounce">🦖</div>
                </div>

                {/* Explosion effect */}
                {showExplosion && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl animate-ping">💥</div>
                        <div className="absolute text-4xl animate-spin">🌟</div>
                        <div className="absolute text-3xl animate-bounce">✨</div>
                    </div>
                )}

                {/* Game Over text slides in */}
                <div className={`transition-all duration-1000 ${phase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                    <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg animate-pulse">
                        EXTINCTION EVENT!
                    </h1>
                    <p className="text-2xl text-yellow-300 mb-2">The age of dinosaurs has ended...</p>
                </div>

                {/* Score reveal with dramatic effect */}
                <div className={`transition-all duration-1000 ${phase >= 3 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                    <div className="bg-black bg-opacity-50 rounded-lg p-6 border-4 border-yellow-400">
                        <p className="text-xl text-white mb-2">Dinosaurs Discovered:</p>
                        <div className="text-5xl font-bold text-yellow-400 animate-pulse">
                            {score}
                        </div>
                        <div className="flex justify-center space-x-2 mt-4">
                            {[...Array(Math.min(score, 10))].map((_, i) => (
                                <span key={i} className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                                    🦕
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating dinosaur emojis */}
            <div className="absolute inset-0 pointer-events-none">
                {['🦕', '🦖', '🦴', '🥚'].map((emoji, i) => (
                    <div
                        key={i}
                        className="absolute text-4xl animate-bounce"
                        style={{
                            left: `${20 + i * 20}%`,
                            top: `${30 + (i % 2) * 40}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: '2s'
                        }}
                    >
                        {emoji}
                    </div>
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes meteorFall {
                    0% {
                        transform: translateY(-100vh) rotate(45deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(45deg);
                        opacity: 0;
                    }
                }
                `
            }} />
        </div>
    );
};