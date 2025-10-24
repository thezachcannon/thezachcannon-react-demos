'use client';
import { startTransition, useEffect, useMemo, useState, useEffectEvent } from "react";
import { PieceOfTrash } from "./components/PieceOfTrash/PieceOfTrash";
import { TrashType } from "./components/PieceOfTrash/Trash";

type TrashItem = {
    hasPickedUp: boolean;
    shouldShow: boolean;
}
const randomTrashType = () => {
    const types = Object.values(TrashType);
    return types[Math.floor(Math.random() * types.length)];
}

const TIME_LIMIT = 41
export const NotInMyBackyard = () => {
    const [gameStarting, setGameStarting] = useState(false)
    const piecesOfTrash = useMemo<TrashType[]>(() => Array.from({ length: 100 }, (_, i) => randomTrashType()), []);
    const [piecesOfTrashLookup, setPiecesOfTrashLookup] = useState<Record<number, TrashItem>>(piecesOfTrash.reduce((acc, _: string, index: number): Record<number, TrashItem> => {
        acc[index] = { hasPickedUp: false, shouldShow: false };
        return acc;
    }, {} as Record<number, TrashItem>))
    const [timeIsUp, setTimeIsUp] = useState(false)
    const [timerTime, setTimerTime] = useState(0)
    const trashLeft = Object.values(piecesOfTrashLookup).some(x => x.hasPickedUp === false);

    const handleClick = (index: number) => {
        startTransition(() => {
            setPiecesOfTrashLookup(s => {
                const newState = { ...s };
                newState[index].hasPickedUp = true;
                return newState;
            })
        })
    }

    function getTrashStatusIndexes(piecesOfTrashLookup: Record<number, TrashItem>): [number[], number[]] {
        return Object.values(piecesOfTrashLookup).reduce((acc, item, index) => {
            if (item.shouldShow) {
                acc[0].push(index);
            } else {
                acc[1].push(index);
            }
            return acc;
        }, [[], []] as [number[], number[]]);
    }

    const onUpdatePieces = useEffectEvent(() => {
        const trashLeft = Object.values(piecesOfTrashLookup).some(x => x.hasPickedUp === false);
        if (!trashLeft) return;
        const [shownTrashIndexes, hiddenTrashIndexes] = getTrashStatusIndexes(piecesOfTrashLookup);
        setPiecesOfTrashLookup(s => {
            const newState = { ...s };
            if (Math.random() < 0.8 && hiddenTrashIndexes.length > 0) {
                const randomIndex = hiddenTrashIndexes[Math.floor(Math.random() * hiddenTrashIndexes.length)];
                newState[randomIndex].shouldShow = true;
            }
            //20 percent chance to hide a shown trash piece
            if (Math.random() < 0.2 && shownTrashIndexes.length > 0) {
                const randomShownIndex = shownTrashIndexes[Math.floor(Math.random() * shownTrashIndexes.length)]
                newState[randomShownIndex].shouldShow = false;
            }
            return newState;
        })
    })

    const onUpdateTime = useEffectEvent(() => {
        if(timerTime < TIME_LIMIT) setTimerTime(s => s + 1)
    })

    useEffect(() => {
        if(!gameStarting) return;
        const timeout = setTimeout(() => {
            setTimeIsUp(true)
        }, TIME_LIMIT * 1000)
        return () => timeout && clearTimeout(timeout)
    }, [])

    useEffect(() => {
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
    }, []);
    
    const currentScore = Object.values(piecesOfTrashLookup).filter(t => t.hasPickedUp).length;
    
    if(!gameStarting) return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">🌍 Not In My Backyard</h1>
                <p className="text-lg text-gray-600 mb-8">Clean up the environment by collecting trash!</p>
                <button 
                    onClick={() => setGameStarting(true)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    🚀 Start Cleaning!
                </button>
            </div>
        </div>
    );
    
    if (!trashLeft || TIME_LIMIT - timerTime == 0) return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">🎉 Game Complete!</h2>
                <div className="text-6xl font-bold text-green-600 mb-4">{currentScore}</div>
                <p className="text-xl text-gray-600 mb-6">Pieces of trash collected!</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                    Play Again
                </button>
            </div>
        </div>
    );
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-6 slow-mouse floating-particles">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header with timer and score */}
                <div className="flex justify-between items-center mb-8">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">⏰</span>
                            <span className="text-2xl font-bold text-red-600">{TIME_LIMIT - timerTime}s</span>
                        </div>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🗑️</span>
                            <span className="text-2xl font-bold text-green-600">{currentScore}</span>
                        </div>
                    </div>
                </div>
                
                {/* Game grid */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
                    <div style={{ minHeight: "400px" }} className="grid grid-cols-10 gap-2 justify-items-center">
                        {piecesOfTrash.map((_, x) => (
                            <div 
                                style={{ height: "40px", width: "40px" }} 
                                key={x}
                                className="flex items-center justify-center"
                            >
                                {!piecesOfTrashLookup[x].hasPickedUp && piecesOfTrashLookup[x].shouldShow && (
                                    <div className="trash-item cursor-pointer hover:scale-110 transition-all duration-200 rounded-lg p-1 hover:bg-yellow-200/50">
                                        <PieceOfTrash onClick={() => handleClick(x)} trashType={_} number={x} />
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