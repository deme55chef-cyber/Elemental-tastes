
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '../types';

interface Props {
  progress: Progress;
  updateProgress: (p: Partial<Progress>) => void;
}

const Episodes: React.FC<Props> = ({ progress, updateProgress }) => {
  const navigate = useNavigate();
  
  const MAYA_VIDEO_ID = "video_maya";
  const youtubeVideoId = "I_8Msf8zxZw";
  const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`;

  // Recupera il progresso (0-100)
  const currentProgress = progress.episodeProgress[MAYA_VIDEO_ID] || 0;
  const isCompleted = currentProgress >= 100;

  const handleOpenYouTube = () => {
    window.open(youtubeUrl, '_blank');
    // Se è la prima volta, iniziamo il progresso al 10%
    if (currentProgress === 0) {
      updateProgress({
        episodeProgress: { ...progress.episodeProgress, [MAYA_VIDEO_ID]: 10 }
      });
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    updateProgress({
      episodeProgress: { ...progress.episodeProgress, [MAYA_VIDEO_ID]: val },
      completedEpisodes: val >= 100 
        ? Array.from(new Set([...progress.completedEpisodes, MAYA_VIDEO_ID]))
        : progress.completedEpisodes.filter(id => id !== MAYA_VIDEO_ID)
    });
  };

  return (
    <div className="h-full flex flex-col bg-black overflow-hidden select-none font-sans">
      {/* Navbar */}
      <div className="safe-top p-8 flex items-center justify-between z-30">
        <button 
          onClick={() => navigate('/')} 
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center active:scale-90 transition-transform"
        >
          <span className="text-2xl text-zinc-400">←</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 pb-20">
        <div className="relative">
          {/* Box Episodio - Margine superiore per compensare la rimozione del titolo */}
          <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden bg-zinc-900 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
            
            {/* Immagine di anteprima che apre YouTube */}
            <div 
              onClick={handleOpenYouTube}
              className="absolute inset-0 cursor-pointer"
            >
              <img 
                src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                alt="Maya"
                className="absolute inset-0 w-full h-full object-cover opacity-80 active:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 space-y-6">
                <div className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center active:scale-110 transition-all duration-500">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-black border-b-[10px] border-b-transparent ml-1"></div>
                </div>
                
                <div className="text-center px-4">
                  <h4 className="text-3xl font-serif italic text-white tracking-wide drop-shadow-lg">Ep 1: Maya</h4>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/60 mt-2">Guarda su YouTube</p>
                </div>
              </div>
            </div>

            {/* Badge Percentuale */}
            {currentProgress > 0 && (
              <div className="absolute top-8 right-8 px-5 py-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full flex items-center gap-2 shadow-2xl z-20 pointer-events-none">
                <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-green-400' : 'bg-orange-400'}`}></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  {isCompleted ? 'Completato' : `${currentProgress}%`}
                </span>
              </div>
            )}

            {/* Controllo Progresso Manuale */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent pt-12">
               <div className="flex flex-col gap-3">
                 <div className="flex justify-between items-center px-1">
                    <span className="text-[8px] uppercase tracking-widest text-white/40 font-bold">Progresso Visione</span>
                    <span className="text-[8px] text-white/60 font-mono">{currentProgress}%</span>
                 </div>
                 <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={currentProgress} 
                    onChange={handleSliderChange}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white"
                 />
               </div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col items-center opacity-20">
            <div className="flex gap-2 mb-4">
              {[1,2,3].map(i => <div key={i} className={`w-1 h-1 rounded-full ${i === 1 ? 'bg-white' : 'bg-white/30'}`}></div>)}
            </div>
            <span className="text-[8px] uppercase tracking-[0.4em] text-white font-bold">Elemental Tastes Lab</span>
          </div>
        </div>
      </div>

      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
          cursor: pointer;
          border: 4px solid #000;
        }
      `}</style>
    </div>
  );
};

export default Episodes;
