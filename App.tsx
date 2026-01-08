
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home.tsx';
import Episodes from './views/Episodes.tsx';
import EpisodeDetail from './views/EpisodeDetail.tsx';
import Games from './views/Games.tsx';
import GameView from './views/GameView.tsx';
import { Progress } from './types.ts';

const App: React.FC = () => {
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem('loom_progress');
    const defaultProgress = { completedEpisodes: [], episodeProgress: {}, highScores: {} };
    if (!saved) return defaultProgress;
    const parsed = JSON.parse(saved);
    return { ...defaultProgress, ...parsed };
  });

  useEffect(() => {
    localStorage.setItem('loom_progress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (newProgress: Partial<Progress>) => {
    setProgress(prev => ({ ...prev, ...newProgress }));
  };

  return (
    <HashRouter>
      <div className="relative w-full h-screen overflow-hidden bg-black text-white select-none">
        <Routes>
          <Route path="/" element={<Home progress={progress} updateProgress={updateProgress} />} />
          <Route path="/episodes" element={<Episodes progress={progress} updateProgress={updateProgress} />} />
          <Route path="/episodes/:id" element={<EpisodeDetail progress={progress} updateProgress={updateProgress} />} />
          <Route path="/games" element={<Games progress={progress} />} />
          <Route path="/games/:id" element={<GameView updateProgress={updateProgress} progress={progress} />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
