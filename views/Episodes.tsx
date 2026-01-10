
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

  const currentProgress = progress.episodeProgress[MAYA_VIDEO_ID] || 0;
  const isCompleted = currentProgress >= 100;

  const handleOpenYouTube = () => {
    window.open(youtubeUrl, '_blank');
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
      {/* Navbar ultra-slim */}
      <div className="p-4 pb-2 flex items-center justify-between z-30">
        <button 
          onClick={() => navigate('/')} 
          className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center active:scale-90 transition-transform"
        >
          <span className="text-sm text-zinc-400">←</span>
        </button>
        <span className="text-[8px] uppercase tracking-[0.2em] text-white/20 font-bold">Archivio</span>
      </div>

      <div className="flex-1 px-5 pt-2">
        <div className="space-y-3">
          
          {/* Rettangolo Episodio compattato della metà */}
          <div className="relative w-full overflow-hidden bg-zinc-900/40 border border-white/5 rounded-2xl">
            
            {/* Header compatto: Titolo e Play */}
            <div 
              onClick={handleOpenYouTube}
              className="relative w-full h-12 cursor-pointer group flex items-center px-5"
            >
              <div className="absolute inset-0 opacity-10 bg-white/5 group-active:bg-white/10 transition-colors"></div>
              <h4 className="text-sm font-serif italic text-white/90">Ep 1: Maya</h4>
              
              <div className="ml-auto w-6 h-6 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                 <div className="w-0 h-0 border-t-[2.5px] border-t-transparent border-l-[5px] border-l-white/60 border-b-[2.5px] border-b-transparent ml-0.5"></div>
              </div>
            </div>

            {/* Progresso minimale (Sottile linea e percentuale) */}
            <div className="px-5 pb-3 pt-1">
               <div className="flex flex-col gap-2">
                 <div className="flex justify-between items-center h-2">
                    <span className="text-[7px] uppercase tracking-widest text-white/20">Progresso</span>
                    <span className="text-[9px] font-mono text-white/40">{currentProgress}%</span>
                 </div>
                 
                 <div className="relative h-4 flex items-center">
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={currentProgress} 
                        onChange={handleSliderChange}
                        className="w-full h-0.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-white"
                    />
                 </div>
               </div>
            </div>
          </div>

          {/* Placeholder ancora più sottile */}
          <div className="w-full h-10 rounded-2xl border border-dashed border-white/5 flex items-center justify-center">
            <span className="text-[6px] uppercase tracking-[0.3em] text-white/10">In arrivo</span>
          </div>

        </div>
      </div>

      <div className="pb-4 flex flex-col items-center opacity-5">
        <span className="text-[5px] uppercase tracking-[0.5em] text-white">Elemental Lab</span>
      </div>

      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 8px;
          width: 8px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 1.5px solid #000;
        }
        input[type=range]::-moz-range-thumb {
          height: 8px;
          width: 8px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 1.5px solid #000;
        }
      `}</style>
    </div>
  );
};

export default Episodes;
