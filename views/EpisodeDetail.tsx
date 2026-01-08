
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EPISODES } from '../constants';
import { Progress } from '../types';

interface Props {
  progress: Progress;
  updateProgress: (p: Partial<Progress>) => void;
}

const EpisodeDetail: React.FC<Props> = ({ progress, updateProgress }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const episode = EPISODES.find(e => e.id === id);
  
  // Riprendiamo dalla pagina salvata se presente
  const [currentPage, setCurrentPage] = useState(() => {
    return (id && progress.episodeProgress[id]) || 0;
  });

  if (!episode) return null;

  const handleNext = () => {
    const nextIdx = currentPage + 1;
    if (nextIdx < episode.content.length) {
      setCurrentPage(nextIdx);
      // Salviamo il progresso corrente
      updateProgress({
        episodeProgress: { ...progress.episodeProgress, [episode.id]: nextIdx }
      });
    } else {
      // Completato
      updateProgress({ 
        completedEpisodes: Array.from(new Set([...progress.completedEpisodes, episode.id])),
        episodeProgress: { ...progress.episodeProgress, [episode.id]: currentPage }
      });
      navigate('/episodes');
    }
  };

  return (
    <div className="h-full relative overflow-hidden bg-[#000000] flex flex-col">
      <div className="absolute inset-0 opacity-40">
        <img src={episode.image} alt="" className="w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col px-8 pt-24 pb-12 safe-top safe-bottom">
        <div className="flex-1 flex items-center justify-center">
          <p key={currentPage} className="text-2xl font-serif italic leading-relaxed text-center text-white animate-in fade-in slide-in-from-bottom-6 duration-700">
            {episode.content[currentPage]}
          </p>
        </div>

        <div className="space-y-10">
          <div className="flex justify-center gap-2">
            {episode.content.map((_, i) => (
              <div 
                key={i} 
                className={`h-[2px] transition-all duration-500 rounded-full ${i <= currentPage ? 'w-8 bg-white' : 'w-2 bg-white/10'}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-full py-6 bg-white text-black rounded-3xl font-bold uppercase tracking-[0.3em] text-[10px] active:scale-95 transition-transform shadow-2xl"
          >
            {currentPage === episode.content.length - 1 ? 'Concludi l\'Assaggio' : 'Prossimo Frammento'}
          </button>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/episodes')}
        className="absolute top-12 left-6 z-20 text-white/30 p-2 hover:text-white transition-colors"
      >
        <span className="text-2xl">✕</span>
      </button>
    </div>
  );
};

export default EpisodeDetail;
