'use client';
import { startTransition, useEffect, useMemo, useState, useEffectEvent } from "react";
import { PieceOfTrash } from "./components/PieceOfTrash/PieceOfTrash";
import { TrashType } from "./components/PieceOfTrash/Trash";

type TrashItem = {
    hasPickedUp: boolean;
    shouldShow: boolean;
}

type LeaderboardEntry = {
    score: number;
    date: string;
}
const randomTrashType = () => {
    const types = Object.values(TrashType);
    return types[Math.floor(Math.random() * types.length)];
}

const TIME_LIMIT = 41

const getLeaderboard = (): LeaderboardEntry[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('nimby-leaderboard');
    return stored ? JSON.parse(stored) : [];
}

const saveToLeaderboard = (score: number) => {
    if (typeof window === 'undefined') return;
    const leaderboard = getLeaderboard();
    const newEntry: LeaderboardEntry = {
        score,
        date: new Date().toLocaleDateString()
    };
    leaderboard.push(newEntry);
    leaderboard.sort((a, b) => b.score - a.score);
    const top10 = leaderboard.slice(0, 10);
    localStorage.setItem('nimby-leaderboard', JSON.stringify(top10));
}

export const NotInMyBackyard = () => {
    const [gameStarting, setGameStarting] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
    const [showLeaderboard, setShowLeaderboard] = useState(false)
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
        setLeaderboard(getLeaderboard());
    }, []);

    useEffect(() => {
        if(!gameStarting) return;
        const timeout = setTimeout(() => {
            setTimeIsUp(true)
        }, TIME_LIMIT * 1000)
        return () => timeout && clearTimeout(timeout)
    }, [gameStarting])

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
    
    const handleGameOver = () => {
        if (!gameOver) {
            saveToLeaderboard(currentScore);
            setLeaderboard(getLeaderboard());
            setGameOver(true);
        }
    }

    const resetGame = () => {
        setGameStarting(false);
        setGameOver(false);
        setTimeIsUp(false);
        setTimerTime(0);
        setPiecesOfTrashLookup(piecesOfTrash.reduce((acc, _: string, index: number): Record<number, TrashItem> => {
            acc[index] = { hasPickedUp: false, shouldShow: false };
            return acc;
        }, {} as Record<number, TrashItem>));
    }

    if(!gameStarting) return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 via-red-300 to-blue-400">
            <div className="text-center">
                <h1 className="text-6xl font-black mb-8 text-white drop-shadow-lg transform -rotate-2 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                    🗑️ Not In My Backyard! 🏠
                </h1>
                <div className="space-y-6">
                    <button 
                        onClick={() => setGameStarting(true)} 
                        className="px-8 py-4 bg-blue-600 text-white text-xl font-bold rounded-full hover:bg-blue-700 transition-all transform hover:scale-110 shadow-lg border-4 border-white block mx-auto animate-pulse"
                    >
                        🎮 START GAME! 🎮
                    </button>
                    <button 
                        onClick={() => setShowLeaderboard(!showLeaderboard)} 
                        className="px-8 py-4 bg-red-600 text-white text-xl font-bold rounded-full hover:bg-red-700 transition-all transform hover:scale-110 shadow-lg border-4 border-white block mx-auto"
                    >
                        🏆 {showLeaderboard ? 'HIDE' : 'SHOW'} LEADERBOARD 🏆
                    </button>
                </div>
                {showLeaderboard && (
                    <div className="mt-8 bg-white p-8 rounded-3xl max-w-md mx-auto shadow-2xl border-4 border-blue-600 transform rotate-1">
                        <h2 className="text-3xl font-black mb-6 text-red-600">🏆 TOP 10 HEROES! 🏆</h2>
                        {leaderboard.length === 0 ? (
                            <p className="text-blue-600 text-lg font-bold">No heroes yet! Be the first! 🦸‍♂️</p>
                        ) : (
                            <ol className="space-y-3">
                                {leaderboard.map((entry, index) => (
                                    <li key={index} className={`flex justify-between items-center p-3 rounded-xl ${index === 0 ? 'bg-yellow-200 border-2 border-yellow-400' : index < 3 ? 'bg-blue-100 border-2 border-blue-300' : 'bg-red-100 border-2 border-red-300'}`}>
                                        <span className="font-black text-lg">{index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}</span>
                                        <span className="font-bold text-lg">{entry.score} 🗑️</span>
                                        <span className="text-sm font-semibold">{entry.date}</span>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
    
    if (!trashLeft || TIME_LIMIT - timerTime == 0) {
        handleGameOver();
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-400 via-red-300 to-blue-400">
                <div className="text-center bg-white p-10 rounded-3xl shadow-2xl border-8 border-blue-600 transform -rotate-1">
                    <h2 className="text-5xl font-black mb-6 text-red-600">🎯 GAME OVER! 🎯</h2>
                    <p className="text-3xl mb-8 font-bold text-blue-600">Final Score: {currentScore} 🗑️</p>
                    {leaderboard.length > 0 && currentScore >= leaderboard[Math.min(9, leaderboard.length - 1)]?.score && (
                        <p className="text-yellow-500 font-black text-2xl mb-6 animate-bounce">🎉 NEW HIGH SCORE! 🎉</p>
                    )}
                    <button 
                        onClick={resetGame}
                        className="px-10 py-5 bg-red-600 text-white text-2xl font-black rounded-full hover:bg-red-700 transition-all transform hover:scale-110 shadow-lg border-4 border-white animate-pulse"
                    >
                        🔄 PLAY AGAIN! 🔄
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-400 via-red-300 to-blue-400 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Header with timer and score */}
                <div className="flex justify-between items-center mb-6">
                    <div className="bg-white p-4 rounded-2xl shadow-lg border-4 border-red-600 transform -rotate-2">
                        <div className="text-3xl font-black text-red-600">⏰ {TIME_LIMIT - timerTime}s</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-lg border-4 border-blue-600 transform rotate-2">
                        <div className="text-3xl font-black text-blue-600">🗑️ {currentScore}</div>
                    </div>
                </div>
                
                {/* Game area */}
                <div className="bg-white p-6 rounded-3xl shadow-2xl border-8 border-blue-600">
                    <div style={{ minHeight: "320px" }} className="grid grid-cols-10 justify-items-center gap-2 bg-gradient-to-br from-blue-100 to-red-100 p-4 rounded-2xl">
                        {piecesOfTrash.map((_, x) => (
                            <div 
                                style={{ height: "32px", width: "32px" }} 
                                key={x}
                                className="flex items-center justify-center"
                            >
                                {!piecesOfTrashLookup[x].hasPickedUp && piecesOfTrashLookup[x].shouldShow && (
                                    <div className="cursor-pointer hover:scale-125 transition-transform duration-200 hover:rotate-12 animate-bounce">
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