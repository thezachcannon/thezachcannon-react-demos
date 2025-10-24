'use client';
import { startTransition, useEffect, useMemo, useState, useCallback } from "react";
import { PieceOfTrash } from "./components/PieceOfTrash/PieceOfTrash";
import { TrashType } from "./components/PieceOfTrash/Trash";
import { GameOver } from "./components/GameOver/GameOver";

type DebrisItem = {
    hasPickedUp: boolean;
    shouldShow: boolean;
}

const randomDebrisType = () => {
    const types = Object.values(TrashType);
    return types[Math.floor(Math.random() * types.length)];
}

const TIME_LIMIT = 41; 
export const NotInMyBackyard = () => {
    const imperialDebris = useMemo<TrashType[]>(() => Array.from({ length: 100 }, () => randomDebrisType()), []);
    const [debrisLookup, setDebrisLookup] = useState<Record<number, DebrisItem>>(imperialDebris.reduce((acc, _, index: number): Record<number, DebrisItem> => {
        acc[index] = { hasPickedUp: false, shouldShow: false };
        return acc;
    }, {} as Record<number, DebrisItem>))
    const [timerTime, setTimerTime] = useState(0)
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const debrisLeft = Object.values(debrisLookup).some(x => x.hasPickedUp === false);

    const handleClick = (index: number) => {
        startTransition(() => {
            setDebrisLookup(s => {
                const newState = { ...s };
                newState[index].hasPickedUp = true;
                return newState;
            })
        })
    }

    function getDebrisStatusIndexes(debrisLookup: Record<number, DebrisItem>): [number[], number[]] {
        return Object.values(debrisLookup).reduce((acc, item, index) => {
            if (item.shouldShow) {
                acc[0].push(index);
            } else {
                acc[1].push(index);
            }
            return acc;
        }, [[], []] as [number[], number[]]);
    }

    const onUpdatePieces = useCallback(() => {
        const debrisLeft = Object.values(debrisLookup).some(x => x.hasPickedUp === false);
        if (!debrisLeft) return;
        const [shownDebrisIndexes, hiddenDebrisIndexes] = getDebrisStatusIndexes(debrisLookup);
        setDebrisLookup(s => {
            const newState = { ...s };
            if (Math.random() < 0.8 && hiddenDebrisIndexes.length > 0) {
                const randomIndex = hiddenDebrisIndexes[Math.floor(Math.random() * hiddenDebrisIndexes.length)];
                newState[randomIndex].shouldShow = true;
            }
            // 20 percent chance to hide a shown debris piece
            if (Math.random() < 0.2 && shownDebrisIndexes.length > 0) {
                const randomShownIndex = shownDebrisIndexes[Math.floor(Math.random() * shownDebrisIndexes.length)]
                newState[randomShownIndex].shouldShow = false;
            }
            return newState;
        })
    }, [debrisLookup])

    const onUpdateTime = useCallback(() => {
        setTimerTime(s => {
            if (s >= TIME_LIMIT - 1) {
                setGameEnded(true);
                return TIME_LIMIT;
            }
            return s + 1;
        });
    }, [])

    useEffect(() => {
        if (!isGameStarted || gameEnded) return;
        
        const timeout = setTimeout(() => {
            setGameEnded(true)
        }, TIME_LIMIT * 1000)
        return () => timeout && clearTimeout(timeout)
    }, [isGameStarted, gameEnded])

    useEffect(() => {
        if (!isGameStarted || gameEnded) return;
        
        const interval = setInterval(() => {
            onUpdatePieces()
        }, 100)

        const timeInterval = setInterval(() => {
            onUpdateTime()
        }, 1000)

        return () => {
            interval && clearInterval(interval)
            timeInterval && clearInterval(timeInterval)
        }
    }, [isGameStarted, gameEnded, onUpdatePieces, onUpdateTime]);
    
    const currentScore = Object.values(debrisLookup).filter(t => t.hasPickedUp).length;
    
    const restartGame = () => {
        setIsGameStarted(false);
        setGameEnded(false);
        setTimerTime(0);
        setDebrisLookup(imperialDebris.reduce((acc, _, index: number): Record<number, DebrisItem> => {
            acc[index] = { hasPickedUp: false, shouldShow: false };
            return acc;
        }, {} as Record<number, DebrisItem>));
    };

    if (!isGameStarted) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-yellow-400 flex items-center justify-center p-4">
                <div className="text-center max-w-2xl mx-auto">
                    <div className="text-6xl font-bold text-yellow-300 mb-6 animate-pulse">
                        STAR WARS
                    </div>
                    <div className="text-2xl font-bold mb-4">IMPERIAL CLEANUP MISSION</div>
                    <div className="text-lg mb-8 text-gray-300 leading-relaxed">
                        The Death Star has been destroyed! Imperial debris is scattered across the galaxy. 
                        As a member of the Rebel Alliance, your mission is to clean up as much debris as possible 
                        before Imperial reinforcements arrive.
                    </div>
                    <div className="bg-gray-900 border-2 border-yellow-400 rounded-lg p-6 mb-8">
                        <h3 className="text-xl font-bold mb-4 text-yellow-300">Mission Briefing:</h3>
                        <ul className="text-left space-y-2 text-gray-300">
                            <li>⏱️ You have {TIME_LIMIT} seconds to complete the mission</li>
                            <li>🎯 Click on Imperial debris to collect it</li>
                            <li>⚡ Debris appears and disappears randomly</li>
                            <li>🏆 Higher scores earn better rebel ranks</li>
                        </ul>
                    </div>
                    <button 
                        onClick={() => setIsGameStarted(true)}
                        className="px-8 py-4 bg-yellow-600 text-black font-bold text-xl rounded-lg hover:bg-yellow-500 transition-colors"
                    >
                        🚀 Begin Cleanup Mission
                    </button>
                </div>
            </div>
        );
    }

    if (!debrisLeft || TIME_LIMIT - timerTime <= 0 || gameEnded) {
        return <GameOver score={currentScore} onRestart={restartGame} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-yellow-400 p-4">
            <div className="max-w-6xl mx-auto">
                {/* HUD */}
                <div className="flex justify-between items-center mb-6 bg-gray-900 border-2 border-yellow-400 rounded-lg p-4">
                    <div className="text-2xl font-bold">
                        ⏱️ Time: <span className="text-yellow-300">{TIME_LIMIT - timerTime}s</span>
                    </div>
                    <div className="text-center">
                        <div className="text-lg text-gray-300">IMPERIAL CLEANUP MISSION</div>
                        <div className="text-sm text-gray-500">Rebel Alliance Operations</div>
                    </div>
                    <div className="text-2xl font-bold">
                        🎯 Debris: <span className="text-yellow-300">{currentScore}</span>
                    </div>
                </div>

                {/* Game Grid */}
                <div className="bg-gray-900 border border-yellow-600 rounded-lg p-4">
                    <div style={{ minHeight: "320px" }} className="grid grid-cols-10 justify-items-center gap-1">
                        {imperialDebris.map((debrisType, index) => (
                            <div 
                                style={{ height: "32px", width: "32px" }} 
                                key={index}
                                className="flex items-center justify-center"
                            >
                                {!debrisLookup[index].hasPickedUp && debrisLookup[index].shouldShow && (
                                    <div className="cursor-pointer hover:scale-110 transition-transform">
                                        <PieceOfTrash 
                                            onClick={() => handleClick(index)} 
                                            trashType={debrisType} 
                                            number={index} 
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 bg-gray-800 border border-yellow-600 rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-2">
                        <span>Mission Progress</span>
                        <span>{currentScore}/100</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${currentScore}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}