export const Home: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-xl w-full p-8 rounded-xl shadow-lg bg-white dark:bg-slate-800 text-center">
        <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Async React Demos</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-4">Choose a demo:</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/activityDemo"
            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500"
          >
            Mocked Async Demo
          </a>
          <a
            href="/pokemonAsyncReact"
            className="inline-flex items-center justify-center px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded-md shadow hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-500"
          >
            API Async Demo
          </a>
        </div>
      </div>
    </main>
  );
};

export default Home;
