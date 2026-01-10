
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
      {/* Sfondo esterno (solo PC) */}
      <div className="w-full h-screen bg-[#050505] flex justify-center items-center overflow-hidden p-0 sm:p-4">
        
        {/* Contenitore App / Mobile Frame - Altezza ridotta per compattezza estrema */}
        <div className="
          relative w-full h-full 
          sm:w-[400px] sm:max-h-[720px] sm:h-[75vh] 
          sm:rounded-[3.5rem] sm:border-[10px] sm:border-[#151515] 
          bg-black text-white select-none 
          shadow-[0_40px_100px_rgba(0,0,0,0.8)] 
          overflow-hidden flex flex-col
        ">
          
          {/* Mockup Notch (Solo su PC) */}
          <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#151515] rounded-b-2xl z-50"></div>
          
          <div className="flex-1 relative overflow-hidden">
            <Routes>
              <Route path="/" element={<Home progress={progress} updateProgress={updateProgress} />} />
              <Route path="/episodes" element={<Episodes progress={progress} updateProgress={updateProgress} />} />
              <Route path="/episodes/:id" element={<EpisodeDetail progress={progress} updateProgress={updateProgress} />} />
              <Route path="/games" element={<Games progress={progress} />} />
              <Route path="/games/:id" element={<GameView updateProgress={updateProgress} progress={progress} />} />
            </Routes>
          </div>

          {/* Home Indicator (Solo su PC) */}
          <div className="hidden sm:block absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/10 rounded-full"></div>
        </div>

      </div>
    </HashRouter>
  );
};

export default App;
