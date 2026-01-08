
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '../types';

interface Props {
  progress: Progress;
  updateProgress: (p: Partial<Progress>) => void;
}

const Home: React.FC<Props> = ({ progress, updateProgress }) => {
  const navigate = useNavigate();
  
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlValue, setUrlValue] = useState('');
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

  const handleUrlSubmit = () => {
    if (urlValue.trim()) {
      updateProgress({ customVideo: urlValue.trim() });
      setShowUrlInput(false);
      setUrlValue('');
      setLoadStatus('loading');
      setCurrentTry(0);
    }
  };

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
      <div className="relative w-full h-[65vh] shrink-0 bg-black overflow-hidden">
        
        <img 
          key={mediaSource}
          src={mediaSource} 
          onLoad={() => setLoadStatus('success')}
          onError={handleError}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${loadStatus === 'success' ? 'opacity-80' : 'opacity-0'}`}
          alt=""
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none"></div>

        {/* Pulsanti di Controllo */}
        <div className="absolute top-12 right-6 z-50 flex flex-col gap-4">
          <button 
            onClick={handleShare}
            className="w-10 h-10 rounded-full backdrop-blur-xl border border-white/5 bg-black/40 flex items-center justify-center active:scale-90 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
          </button>

          <button 
            onClick={() => setShowUrlInput(!showUrlInput)}
            className={`w-10 h-10 rounded-full backdrop-blur-xl border transition-all duration-300 flex items-center justify-center ${showUrlInput ? 'bg-white border-white rotate-45 shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'bg-black/40 border-white/5'}`}
          >
            <span className={`text-xl font-light ${showUrlInput ? 'text-black' : 'text-white/40'}`}>+</span>
          </button>

          {showUrlInput && (
            <div className="absolute right-0 mt-14 bg-zinc-900/98 backdrop-blur-3xl border border-white/10 p-6 rounded-[2.5rem] w-[85vw] max-w-xs shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-4 font-bold">Atmosfera Personalizzata</p>
              <input 
                type