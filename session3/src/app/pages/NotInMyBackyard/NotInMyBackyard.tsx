'use client';
import { startTransition, useEffect, useMemo, useState, useCallback } from "react";
import { MarioCoin } from "./components/MarioCoin/MarioCoin";
import { CoinType } from "./components/MarioCoin/MarioCoin";
import { Leaderboard } from "./components/Leaderboard/Leaderboard";

type CoinItem = {
    hasPickedUp: boolean;
    shouldShow: boolean;
}
const randomCoinType = () => {
    const types = Object.values(CoinType);
    return types[Math.floor(Math.random() * types.length)];
}

const TIME_LIMIT = 41
export const NotInMyBackyard = () => {
    const [gameStarting, setGameStarting] = useState(false)
    const [playerName, setPlayerName] = useState('')
    const [showLeaderboard, setShowLeaderboard] = useState(false)
    const coins = useMemo<CoinType[]>(() => Array.from({ length: 100 }, () => randomCoinType()), []);
    const [coinsLookup, setCoinsLookup] = useState<Record<number, CoinItem>>(coins.reduce((acc, _, index: number): Record<number, CoinItem> => {
        acc[index] = { hasPickedUp: false, shouldShow: false };
        return acc;
    }, {} as Record<number, CoinItem>))
    const [timerTime, setTimerTime] = useState(0)
    const coinsLeft = Object.values(coinsLookup).some(x => x.hasPickedUp === false);

    const getCoinValue = (coinType: CoinType) => {
        const values = {
            [CoinType.Gold]: 10,
            [CoinType.Silver]: 5,
            [CoinType.Bronze]: 2,
            [CoinType.Star]: 50,
            [CoinType.Mushroom]: 25,
        };
        return values[coinType] || 1;
    };

    const playCoinSound = () => {
        // Create a simple coin sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            // Fallback if Web Audio API is not supported
            console.log('Coin collected!');
        }
    };

    const handleClick = (index: number) => {
        playCoinSound();
        startTransition(() => {
            setCoinsLookup(s => {
                const newState = { ...s };
                newState[index].hasPickedUp = true;
                return newState;
            })
        })
    }

    function getCoinStatusIndexes(coinsLookup: Record<number, CoinItem>): [number[], number[]] {
        return Object.values(coinsLookup).reduce((acc, item, index) => {
            if (item.shouldShow) {
                acc[0].push(index);
            } else {
                acc[1].push(index);
            }
            return acc;
        }, [[], []] as [number[], number[]]);
    }

    const onUpdateCoins = useCallback(() => {
        const coinsLeft = Object.values(coinsLookup).some(x => x.hasPickedUp === false);
        if (!coinsLeft) return;
        const [shownCoinIndexes, hiddenCoinIndexes] = getCoinStatusIndexes(coinsLookup);
        setCoinsLookup(s => {
            const newState = { ...s };
            if (Math.random() < 0.8 && hiddenCoinIndexes.length > 0) {
                const randomIndex = hiddenCoinIndexes[Math.floor(Math.random() * hiddenCoinIndexes.length)];
                newState[randomIndex].shouldShow = true;
            }
            // 20 percent chance to hide a shown coin
            if (Math.random() < 0.2 && shownCoinIndexes.length > 0) {
                const randomShownIndex = shownCoinIndexes[Math.floor(Math.random() * shownCoinIndexes.length)]
                newState[randomShownIndex].shouldShow = false;
            }
            return newState;
        })
    }, [coinsLookup])

    const onUpdateTime = useCallback(() => {
        if(timerTime < TIME_LIMIT) setTimerTime(s => s + 1)
    }, [timerTime])

    const saveScore = useCallback((score: number) => {
        if (!playerName.trim()) return;
        const scores = JSON.parse(localStorage.getItem('marioGameScores') || '[]');
        scores.push({ name: playerName.trim(), score, date: new Date().toISOString() });
        scores.sort((a: any, b: any) => b.score - a.score);
        localStorage.setItem('marioGameScores', JSON.stringify(scores.slice(0, 10))); // Keep top 10
    }, [playerName]);

    useEffect(() => {
        if(!gameStarting) return;
        const timeout = setTimeout(() => {
            const finalScore = Object.entries(coinsLookup)
                .filter(([_, coin]) => coin.hasPickedUp)
                .reduce((total, [index, _]) => total + getCoinValue(coins[parseInt(index)]), 0);
            saveScore(finalScore);
        }, TIME_LIMIT * 1000)
        return () => timeout && clearTimeout(timeout)
    }, [gameStarting, coinsLookup, saveScore])

    useEffect(() => {
        if (!gameStarting) return;
        
        const interval = setInterval(() => {
            onUpdateCoins()
        }, 100)

        const timeInterval = setInterval(() => {
            onUpdateTime()
        }, 1000)

        return () => {
            interval && clearInterval(interval)
            timeInterval && clearInterval(timeInterval)
        }
    }, [gameStarting, onUpdateCoins, onUpdateTime]);

    const currentScore = Object.entries(coinsLookup)
        .filter(([_, coin]) => coin.hasPickedUp)
        .reduce((total, [index, _]) => total + getCoinValue(coins[parseInt(index)]), 0);
    const gameOver = !coinsLeft || TIME_LIMIT - timerTime <= 0;

    if (showLeaderboard) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 p-8">
                <Leaderboard onBack={() => setShowLeaderboard(false)} />
            </div>
        );
    }

    if (!gameStarting) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-center p-8">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
                    <h1 className="text-4xl font-bold text-red-600 mb-4">🍄 Mario Coin Rush! 🍄</h1>
                    <p className="text-gray-700 mb-6">Collect as many coins as you can in {TIME_LIMIT} seconds!</p>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        className="w-full p-3 border rounded mb-4 text-center"
                        maxLength={20}
                    />
                    <div className="space-y-3">
                        <button 
                            onClick={() => setGameStarting(true)}
                            disabled={!playerName.trim()}
                            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            🚀 Start Game
                        </button>
                        <button 
                            onClick={() => setShowLeaderboard(true)}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            🏆 Leaderboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (gameOver) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-center p-8">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
                    <h2 className="text-3xl font-bold text-red-600 mb-4">🎮 Game Over! 🎮</h2>
                    <p className="text-2xl font-bold text-yellow-600 mb-2">Final Score: {currentScore}</p>
                    <p className="text-gray-700 mb-6">Great job, {playerName}!</p>
                    <div className="space-y-3">
                        <button 
                            onClick={() => {
                                setGameStarting(false);
                                setTimerTime(0);
                                setCoinsLookup(coins.reduce((acc, _, index) => {
                                    acc[index] = { hasPickedUp: false, shouldShow: false };
                                    return acc;
                                }, {} as Record<number, CoinItem>));
                            }}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            🔄 Play Again
                        </button>
                        <button 
                            onClick={() => setShowLeaderboard(true)}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                        >
                            🏆 View Leaderboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Game HUD */}
                <div className="bg-white rounded-lg shadow-lg p-4 mb-4 flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <div className="text-2xl font-bold text-red-600">⏰ {TIME_LIMIT - timerTime}s</div>
                        <div className="text-2xl font-bold text-yellow-600">🪙 {currentScore}</div>
                        <div className="text-lg text-gray-700">Player: {playerName}</div>
                    </div>
                    <button 
                        onClick={() => setShowLeaderboard(true)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        🏆 Leaderboard
                    </button>
                </div>

                {/* Game Board */}
                <div className="bg-green-400 rounded-lg shadow-lg p-4" style={{ minHeight: "400px" }}>
                    <div className="grid grid-cols-10 gap-2 justify-items-center">
                        {coins.map((coinType, index) => (
                            <div 
                                key={index} 
                                className="w-8 h-8 flex items-center justify-center"
                            >
                                {!coinsLookup[index].hasPickedUp && coinsLookup[index].shouldShow && (
                                    <div className="cursor-pointer hover:scale-110 transition-transform">
                                        <MarioCoin 
                                            onClick={() => handleClick(index)} 
                                            coinType={coinType}
                                        />
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