
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '../types';

interface Props {
  progress: Progress;
  updateProgress: (p: Partial<Progress>) => void;
}

const Home: React.FC<Props> = ({ progress, updateProgress }) => {
  const navigate = useNavigate();
  
  const [loadStatus, setLoadStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [currentTry, setCurrentTry] = useState(0);

  const defaultMediaId = "1irUcv-M8bgKs5ssBXAu06553hjIeg6oc";
  
  const getLinks = (id: string) => [
    `https://lh3.googleusercontent.com/d/${id}`,
    `https://drive.google.com/uc?id=${id}`,
    `https://docs.google.com/uc?id=${id}`
  ];

  const currentId = progress.customVideo?.includes('id=') 
    ? progress.customVideo.split('id=')[1].split('&')[0]
    : progress.customVideo?.split('/d/')[1]?.split('/')[0] || defaultMediaId;

  const links = getLinks(currentId);
  const mediaSource = links[currentTry];

  const handleError = () => {
    if (currentTry < links.length - 1) {
      setCurrentTry(prev => prev + 1);
    } else {
      setLoadStatus('error');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Elemental Tastes',
          text: 'Vivi un momento di mindfulness sensoriale con me.',
          url: window.location.origin
        });
      } catch (err) {
        console.log('Condivisione annullata');
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      alert('Link copiato negli appunti!');
    }
  };

  return (
    <div className="flex flex-col h-full bg-black overflow-hidden font-sans select-none animate-in fade-in duration-1000">
      
      {/* AREA VISIVA */}
      <div className="relative w-full h-[55%] shrink-0 bg-black overflow-hidden">
        
        <img 
          key={mediaSource}
          src={mediaSource} 
          onLoad={() => setLoadStatus('success')}
          onError={handleError}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${loadStatus === 'success' ? 'opacity-70' : 'opacity-0'}`}
          alt=""
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none"></div>

        {/* Pulsanti di Controllo */}
        <div className="absolute top-10 right-6 z-50 flex flex-col gap-4">
          <button 
            onClick={handleShare}
            className="w-10 h-10 rounded-full backdrop-blur-xl border border-white/5 bg-black/40 flex items-center justify-center active:scale-90 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          </button>
        </div>

        {loadStatus === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
            <div className="w-6 h-6 border-2 border-white/5 border-t-white/20 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Navigazione - Senza descrizioni secondarie */}
      <div className="flex-1 px-8 py-6 flex flex-col justify-center space-y-4">
        <button 
          onClick={() => navigate('/episodes')}
          className="w-full h-16 sm:h-20 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl flex items-center justify-between px-8 active:scale-95 transition-all group"
        >
          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-serif italic text-white group-active:translate-x-1 transition-transform">Episodi</h3>
          </div>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/20 text-xs">→</div>
        </button>

        <button 
          onClick={() => navigate('/games')}
          className="w-full h-16 sm:h-20 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl flex items-center justify-between px-8 active:scale-95 transition-all group"
        >
          <div className="text-left">
            <h3 className="text-lg sm:text-xl font-serif italic text-white group-active:translate-x-1 transition-transform">Mettiti in gioco</h3>
          </div>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/20 text-xs">→</div>
        </button>
      </div>

      <div className="pb-8 text-center opacity-10">
        <p className="text-[7px] uppercase tracking-[1em]">Elemental Tastes</p>
      </div>
    </div>
  );
};

export default Home;
