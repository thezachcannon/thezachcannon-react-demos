
const sessions = [
  { id: 1, name: "Session 1", path: "/takeFlight/session1" },
  { id: 2, name: "Session 2", path: "/takeFlight/session2" },
  { id: 3, name: "Session 3", path: "/takeFlight/session3" },
  { id: 4, name: "Session 4", path: "/takeFlight/session4" },
  { id: 5, name: "Session 5", path: "/takeFlight/session5" },
];

export const TakeFlightLayout: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const isHomePage = currentPath === '/takeFlight' || currentPath === '/takeFlight/';

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-900 to-black">
      {/* Navigation Bar - Hidden on home page */}
      {!isHomePage && (
        <nav className="bg-gradient-to-r from-orange-800 via-black to-orange-800 border-b-2 border-orange-500 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Title */}
              <div className="flex items-center space-x-3">
                <div className="text-3xl animate-bounce">🐅</div>
                <div>
                  <a href="/takeFlight" className="hover:opacity-80 transition-opacity">
                    <h1 className="text-2xl font-bold text-orange-400">
                      Take Flight Games
                    </h1>
                    <p className="text-xs text-orange-300">Tiger Training Academy</p>
                  </a>
                </div>
              </div>

              {/* Session Navigation */}
              <div className="flex space-x-2 bg-gray-900/50 rounded-xl p-2">
                {sessions.map((session) => {
                  const isActive = currentPath === session.path;
                  return (
                    <a
                      key={session.id}
                      href={session.path}
                      className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${isActive
                          ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25 transform scale-105'
                          : 'bg-gray-700/80 text-gray-300 hover:bg-orange-600 hover:text-white hover:scale-105 hover:shadow-lg'
                        }`}
                    >
                      <span className="relative z-10">{session.name}</span>
                      {isActive && (
                        <div className="absolute inset-0 bg-orange-500 rounded-lg animate-pulse opacity-20"></div>
                      )}
                      {!isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-orange-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </a>
                  );
                })}
              </div>

              {/* Home Link */}
              <div className="flex items-center space-x-2">
                <a
                  href="/takeFlight"
                  className="px-4 py-2 bg-gray-700/80 text-gray-300 rounded-lg font-medium hover:bg-gray-600 hover:text-white transition-all duration-200 flex items-center space-x-2 group"
                >
                  <span className="group-hover:animate-bounce">🏠</span>
                  <span>Home</span>
                </a>
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="h-1 bg-gray-700">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-500"
              style={{
                width: `${((sessions.findIndex(s => s.path === currentPath) + 1) / sessions.length) * 100}%`
              }}
            ></div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}