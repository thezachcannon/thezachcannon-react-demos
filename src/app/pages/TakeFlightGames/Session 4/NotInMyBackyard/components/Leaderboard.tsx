import { useEffect, useState } from 'react';

export interface LeaderboardEntry {
    name: string;
    score: number;
    date: string;
}

interface LeaderboardProps {
    currentScore?: number;
    onNameSubmit?: (name: string) => void;
    showNameInput?: boolean;
}

export const Leaderboard = ({ currentScore, onNameSubmit, showNameInput }: LeaderboardProps) => {
    const [scores, setScores] = useState<LeaderboardEntry[]>([]);
    const [playerName, setPlayerName] = useState('');

    useEffect(() => {
        const savedScores = localStorage.getItem('dinoHunterScores');
        if (savedScores) {
            setScores(JSON.parse(savedScores));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (playerName.trim() && currentScore !== undefined) {
            const newEntry: LeaderboardEntry = {
                name: playerName.trim(),
                score: currentScore,
                date: new Date().toLocaleDateString()
            };
            
            const updatedScores = [...scores, newEntry]
                .sort((a, b) => b.score - a.score)
                .slice(0, 10);
            
            setScores(updatedScores);
            localStorage.setItem('dinoHunterScores', JSON.stringify(updatedScores));
            
            if (onNameSubmit) {
                onNameSubmit(playerName.trim());
            }
        }
    };

    return (
        <div className="bg-amber-100 border-4 border-amber-800 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-amber-900 mb-4 text-center">🦕 Dino Hunter Leaderboard 🦖</h2>
            
            {showNameInput && currentScore !== undefined && (
                <form onSubmit={handleSubmit} className="mb-6">
                    <div className="text-center mb-3">
                        <span className="text-lg font-semibold text-amber-800">Your Score: {currentScore}</span>
                    </div>
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full p-2 border-2 border-amber-600 rounded mb-2"
                        maxLength={20}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        Save Score
                    </button>
                </form>
            )}

            <div className="space-y-2">
                {scores.length === 0 ? (
                    <p className="text-amber-700 text-center italic">No scores yet!</p>
                ) : (
                    scores.map((entry, index) => (
                        <div
                            key={index}
                            className={`flex justify-between items-center p-2 rounded ${
                                index === 0 ? 'bg-yellow-300 border-2 border-yellow-600' :
                                index === 1 ? 'bg-gray-200 border-2 border-gray-400' :
                                index === 2 ? 'bg-orange-200 border-2 border-orange-400' :
                                'bg-white border border-amber-300'
                            }`}
                        >
                            <div className="flex items-center">
                                <span className="font-bold mr-2 text-amber-900">
                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                                </span>
                                <span className="text-amber-900">{entry.name}</span>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-amber-900">{entry.score}</div>
                                <div className="text-xs text-amber-700">{entry.date}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};