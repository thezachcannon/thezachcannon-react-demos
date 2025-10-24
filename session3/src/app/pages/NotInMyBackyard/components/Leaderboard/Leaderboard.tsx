import React, { useState, useEffect } from 'react';

interface Score {
  name: string;
  score: number;
  date: string;
}

export const Leaderboard = ({ onBack }: { onBack: () => void }) => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('marioGameScores') || '[]');
    setScores(savedScores);
  }, []);

  const clearLeaderboard = () => {
    if (confirm('Are you sure you want to clear the leaderboard?')) {
      localStorage.removeItem('marioGameScores');
      setScores([]);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getRankEmoji = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${index + 1}.`;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-600 mb-2">🏆 Leaderboard 🏆</h1>
          <p className="text-gray-600">Top Mario Coin Collectors</p>
        </div>

        {scores.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🪙</div>
            <p className="text-xl text-gray-500 mb-4">No scores yet!</p>
            <p className="text-gray-400">Be the first to play and set a high score!</p>
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {scores.map((score, index) => (
              <div 
                key={`${score.name}-${score.date}`}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                  index === 0 
                    ? 'bg-yellow-50 border-yellow-300 shadow-md' 
                    : index === 1 
                    ? 'bg-gray-50 border-gray-300' 
                    : index === 2 
                    ? 'bg-orange-50 border-orange-300'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold min-w-[3rem]">
                    {getRankEmoji(index)}
                  </span>
                  <div>
                    <div className="font-bold text-lg text-gray-800">{score.name}</div>
                    <div className="text-sm text-gray-500">{formatDate(score.date)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-600">🪙 {score.score}</div>
                  <div className="text-sm text-gray-500">coins</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={onBack}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            🎮 Back to Game
          </button>
          {scores.length > 0 && (
            <button 
              onClick={clearLeaderboard}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              🗑️ Clear Scores
            </button>
          )}
        </div>

        {scores.length > 0 && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold text-blue-800 mb-2">🎯 Game Stats</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-600">Total Games:</span>
                <span className="font-bold ml-2">{scores.length}</span>
              </div>
              <div>
                <span className="text-blue-600">Best Score:</span>
                <span className="font-bold ml-2">{Math.max(...scores.map(s => s.score))}</span>
              </div>
              <div>
                <span className="text-blue-600">Average Score:</span>
                <span className="font-bold ml-2">
                  {Math.round(scores.reduce((sum, s) => sum + s.score, 0) / scores.length)}
                </span>
              </div>
              <div>
                <span className="text-blue-600">Total Coins:</span>
                <span className="font-bold ml-2">{scores.reduce((sum, s) => sum + s.score, 0)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};