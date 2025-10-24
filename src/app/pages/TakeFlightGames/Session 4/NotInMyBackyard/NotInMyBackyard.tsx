'use client';
import { startTransition, useEffect, useMemo, useState, useCallback } from "react";
import { DinosaurEgg } from "./components/PieceOfTrash/PieceOfTrash";
import { DinosaurType } from "./components/PieceOfTrash/Trash";
import { Leaderboard } from "./components/Leaderboard";
import { GameOverAnimation } from "./components/GameOverAnimation";

type DinosaurItem = {
    hasDiscovered: boolean;
    shouldShow: boolean;
}
const randomDinosaurType = () => {
    const types = Object.values(DinosaurType);
    return types[Math.floor(Math.random() * types.length)];
}

const TIME_LIMIT = 41
export const NotInMyBackyard = () => {
    const dinosaurs = useMemo<DinosaurType[]>(() => Array.from({ length: 50 }, (_, i) => randomDinosaurType()), []);
    const [dinosaursLookup, setDinosaursLookup] = useState<Record<number, DinosaurItem>>(dinosaurs.reduce((acc, _: string, index: number): Record<number, DinosaurItem> => {
        acc[index] = { hasDiscovered: false, shouldShow: false };
        return acc;
    }, {} as Record<number, DinosaurItem>))
    const [timeIsUp, setTimeIsUp] = useState(false)
    const [timerTime, setTimerTime] = useState(0)
    const dinosaursLeft = Object.values(dinosaursLookup).some(x => x.hasDiscovered === false);
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [showGameOver, setShowGameOver] = useState(false)
    const [showLeaderboard, setShowLeaderboard] = useState(false)
    const [gamePhase, setGamePhase] = useState<'menu' | 'playing' | 'gameOver' | 'leaderboard'>('menu')
    const handleClick = (index: number) => {
        // Add visual feedback
        const element = document.querySelector(`[data-dino-index="${index}"]`);
        if (element) {
            element.classList.add('animate-ping');
        }
        
        startTransition(() => {
            setDinosaursLookup(s => {
                const newState = { ...s };
                newState[index].hasDiscovered = true;
                return newState;
            })
        })
    }

    function getDinosaurStatusIndexes(dinosaursLookup: Record<number, DinosaurItem>): [number[], number[]] {
        return Object.values(dinosaursLookup).reduce((acc, item, index) => {
            if (item.shouldShow && !item.hasDiscovered) {
                acc[0].push(index);
            } else if (!item.hasDiscovered) {
                acc[1].push(index);
            }
            return acc;
        }, [[], []] as [number[], number[]]);
    }

    const onUpdateDinosaurs = useCallback(() => {
        const dinosaursLeft = Object.values(dinosaursLookup).some(x => x.hasDiscovered === false);
        if (!dinosaursLeft) return;
        const [shownDinosaurIndexes, hiddenDinosaurIndexes] = getDinosaurStatusIndexes(dinosaursLookup);
        setDinosaursLookup(s => {
            const newState = { ...s };
            // 70% chance to show a hidden dinosaur
            if (Math.random() < 0.7 && hiddenDinosaurIndexes.length > 0) {
                const randomIndex = hiddenDinosaurIndexes[Math.floor(Math.random() * hiddenDinosaurIndexes.length)];
                newState[randomIndex].shouldShow = true;
            }
            // 15% chance to hide a shown dinosaur (they're shy!)
            if (Math.random() < 0.15 && shownDinosaurIndexes.length > 0) {
                const randomShownIndex = shownDinosaurIndexes[Math.floor(Math.random() * shownDinosaurIndexes.length)]
                newState[randomShownIndex].shouldShow = false;
            }
            return newState;
        })
    }, [dinosaursLookup])

    const onUpdateTime = useCallback(() => {
        if(timerTime < TIME_LIMIT) setTimerTime(s => s + 1)
    }, [timerTime])

    useEffect(() => {
        if (gamePhase === 'playing') {
            const timeout = setTimeout(() => {
                setTimeIsUp(true)
                setGamePhase('gameOver')
            }, TIME_LIMIT * 1000)
            return () => timeout && clearTimeout(timeout)
        }
    }, [gamePhase])

    useEffect(() => {
        if (gamePhase === 'playing') {
            const interval = setInterval(() => {
                onUpdateDinosaurs()
            }, 150)

            const timeInterval = setInterval(() => {
                onUpdateTime()
            }, 1000)

            return () => {
                interval && clearInterval(interval)
                timeInterval && clearInterval(timeInterval)
            }
        }
    }, [gamePhase]);

    // Check if game should end
    useEffect(() => {
        if (gamePhase === 'playing' && (!dinosaursLeft || TIME_LIMIT - timerTime <= 0)) {
            setGamePhase('gameOver')
        }
    }, [dinosaursLeft, timerTime, gamePhase])
    
    const currentScore = Object.values(dinosaursLookup).filter(d => d.hasDiscovered).length;

    const startGame = () => {
        setGamePhase('playing')
        setIsGameStarted(true)
        setTimerTime(0)
        setTimeIsUp(false)
    }

    const handleGameOverComplete = () => {
        setGamePhase('leaderboard')
    }

    const handleNameSubmit = () => {
        setGamePhase('menu')
        // Reset game state
        setDinosaursLookup(dinosaurs.reduce((acc, _: string, index: number): Record<number, DinosaurItem> => {
            acc[index] = { hasDiscovered: false, shouldShow: false };
            return acc;
        }, {} as Record<number, DinosaurItem>))
        setTimerTime(0)
        setIsGameStarted(false)
    }

    // Menu phase
    if (gamePhase === 'menu') {
        return (
            <div className="min-h-screen bg-gradient-to-b from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-center bg-white bg-opacity-90 rounded-lg p-8 max-w-md mx-auto shadow-2xl">
                    <div className="text-6xl mb-4">🦕</div>
                    <h1 className="text-4xl font-bold text-green-800 mb-4">Dino Hunter</h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Discover as many dinosaurs as you can before the meteor hits! 
                        They appear and disappear quickly, so stay alert!
                    </p>
                    <button 
                        onClick={startGame}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors transform hover:scale-105"
                    >
                        🚀 Start Expedition
                    </button>
                    <div className="mt-4">
                        <Leaderboard />
                    </div>
                </div>
            </div>
        )
    }

    // Game over animation
    if (gamePhase === 'gameOver') {
        return <GameOverAnimation score={currentScore} onAnimationComplete={handleGameOverComplete} />
    }

    // Leaderboard phase
    if (gamePhase === 'leaderboard') {
        return (
            <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 flex items-center justify-center">
                <div className="max-w-md mx-auto">
                    <Leaderboard 
                        currentScore={currentScore} 
                        showNameInput={true}
                        onNameSubmit={handleNameSubmit}
                    />
                    <div className="text-center mt-4">
                        <button 
                            onClick={() => setGamePhase('menu')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                        >
                            Back to Menu
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Playing phase
    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-200 via-green-300 to-blue-400 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Game UI */}
                <div className="flex justify-between items-center mb-4 bg-white bg-opacity-80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-red-600">
                        ⏰ {TIME_LIMIT - timerTime}s
                    </div>
                    <div className="text-center">
                        <div className="text-lg text-gray-700">Dinosaurs Discovered</div>
                        <div className="text-3xl font-bold text-green-600">{currentScore}</div>
                    </div>
                    <div className="text-lg text-gray-700">
                        🦕 {dinosaurs.length - currentScore} left
                    </div>
                </div>

                {/* Game field */}
                <div className="bg-gradient-to-b from-green-200 to-green-100 bg-opacity-70 rounded-lg p-4 min-h-96 border-4 border-green-600 shadow-lg">
                    <div className="grid grid-cols-10 gap-2 justify-items-center">
                        {dinosaurs.map((dinosaurType, index) => (
                            <div 
                                key={index} 
                                className="w-10 h-10 flex items-center justify-center relative"
                            >
                                {!dinosaursLookup[index].hasDiscovered && dinosaursLookup[index].shouldShow && (
                                    <div 
                                        data-dino-index={index}
                                        className="cursor-pointer hover:bg-yellow-200 rounded-full p-1 transition-all duration-200 hover:scale-125 animate-bounce"
                                    >
                                        <DinosaurEgg 
                                            onClick={() => handleClick(index)} 
                                            dinosaurType={dinosaurType} 
                                            number={index} 
                                        />
                                    </div>
                                )}
                                {dinosaursLookup[index].hasDiscovered && (
                                    <div className="absolute inset-0 flex items-center justify-center text-2xl animate-ping">
                                        ✨
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}