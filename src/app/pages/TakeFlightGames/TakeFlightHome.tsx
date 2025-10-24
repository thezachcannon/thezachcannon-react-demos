const TakeFlightHome: React.FC = () => {
    const sessions = [
        { id: 1, name: "Session 1", path: "/takeFlight/session1" },
        { id: 2, name: "Session 2", path: "/takeFlight/session2" },
        { id: 3, name: "Session 3", path: "/takeFlight/session3" },
        { id: 4, name: "Session 4", path: "/takeFlight/session4" },
        { id: 5, name: "Session 5", path: "/takeFlight/session5" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-900 via-black to-orange-800 text-white">
            {/* Tiger stripe pattern overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full" style={{
                    backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 20px,
            rgba(255, 165, 0, 0.3) 20px,
            rgba(255, 165, 0, 0.3) 40px
          )`
                }}></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center items-center mb-6">
                        <div className="text-6xl animate-bounce mr-4">🐅</div>
                        <div>
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                TAKE FLIGHT
                            </h1>
                            <h2 className="text-2xl font-bold text-orange-300">
                                TIGER TRAINING ACADEMY
                            </h2>
                        </div>
                        <div className="text-6xl animate-bounce ml-4">🐅</div>
                    </div>
                </div>

                {/* Session Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {sessions.map((session) => (
                        <a
                            key={session.id}
                            href={session.path}
                            className="group bg-gradient-to-br from-orange-900/80 to-black/80 border-2 border-orange-500/50 rounded-xl p-8 hover:border-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 text-center"
                        >
                            {/* Tiger stripe accent */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-t-xl"></div>

                            {/* Session number */}
                            <div className="text-6xl font-bold text-orange-400 mb-4 group-hover:text-orange-300 transition-colors">
                                {session.id}
                            </div>

                            {/* Session name */}
                            <h3 className="text-2xl font-bold text-white group-hover:text-orange-200 transition-colors">
                                {session.name}
                            </h3>

                            {/* Tiger claw marks decoration */}
                            <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                                <div className="text-orange-500 transform rotate-12 text-2xl">
                                    🗲
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default TakeFlightHome;