import { useState, useEffect } from 'react';

export interface LeaderboardEntry {
  username: string;
  score: number;
  timestamp: number;
}

interface LeaderboardProps {
  currentScore: number;
  onRestart: () => void;
}

export const Leaderboard = ({ currentScore, onRestart }: LeaderboardProps) => {
  const [username, setUsername] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    // Load leaderboard from localStorage
    const saved = localStorage.getItem('starwars-cleanup-leaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, []);

  const submitScore = () => {
    if (!username.trim()) return;
    
    const newEntry: LeaderboardEntry = {
      username: username.trim(),
      score: currentScore,
      timestamp: Date.now()
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Keep top 10

    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('starwars-cleanup-leaderboard', JSON.stringify(updatedLeaderboard));
    setHasSubmitted(true);
  };

  const getRank = () => {
    const sortedScores = leaderboard.map(entry => entry.score).sort((a, b) => b - a);
    return sortedScores.indexOf(currentScore) + 1;
  };

  return (
    <div className="bg-black text-yellow-400 p-6 rounded-lg border-2 border-yellow-400 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4 text-yellow-300">
        🏆 REBEL ALLIANCE LEADERBOARD 🏆
      </h2>
      
      {!hasSubmitted && (
        <div className="mb-6 p-4 bg-gray-900 rounded border border-yellow-600">
          <p className="text-center mb-3">Your Score: <span className="text-yellow-300 font-bold">{currentScore}</span></p>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Enter your rebel name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-yellow-600 rounded text-yellow-400 placeholder-gray-500"
              maxLength={20}
            />
            <button
              onClick={submitScore}
              disabled={!username.trim()}
              className="px-4 py-2 bg-yellow-600 text-black font-bold rounded hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit to Alliance Records
            </button>
          </div>
        </div>
      )}

      {hasSubmitted && (
        <div className="mb-4 p-3 bg-green-900 border border-green-500 rounded text-center">
          <p className="text-green-300">Score submitted! You rank #{getRank()} among rebels!</p>
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-center">Top Rebel Cleaners</h3>
        <div className="space-y-1">
          {leaderboard.slice(0, 10).map((entry, index) => (
            <div
              key={`${entry.username}-${entry.timestamp}`}
              className={`flex justify-between items-center p-2 rounded ${
                hasSubmitted && entry.score === currentScore && entry.username === username.trim()
                  ? 'bg-yellow-900 border border-yellow-500'
                  : 'bg-gray-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-yellow-300 font-bold w-6">#{index + 1}</span>
                <span>{entry.username}</span>
              </span>
              <span className="font-bold text-yellow-300">{entry.score}</span>
            </div>
          ))}
        </div>
        {leaderboard.length === 0 && (
          <p className="text-center text-gray-500 italic">No rebels have joined the cleanup yet...</p>
        )}
      </div>

      <button
        onClick={onRestart}
        className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-500"
      >
        🚀 Start New Mission
      </button>
    </div>
  );
};