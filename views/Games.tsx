
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '../types';

interface Props {
  progress: Progress;
}

const Games: React.FC<Props> = ({ progress }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-black overflow-hidden select-none font-sans">
      {/* Navbar ultra-sottile */}
      <div className="p-4 flex items-center">
        <button 
          onClick={() => navigate('/')} 
          className="w-8 h-8 flex items-center justify-center active:scale-90 transition-transform"
        >
          <span className="text-xl text-white/50">←</span>
        </button>
      </div>

      <div className="flex-1 px-8 pt-4 flex flex-col justify-center">
        <div className="space-y-6">
          
          <h2 className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold text-center">Laboratorio</h2>

          {/* Box L'ultimo ingresso */}
          <button 
            onClick={() => navigate('/games/rune-puzzle')}
            className="relative w-full overflow-hidden bg-zinc-900/20 border border-white/5 rounded-3xl active:scale-[0.98] transition-all group aspect-[2/1] flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 to-transparent"></div>
            
            <h4 className="text-lg font-serif italic text-white/80 z-10">L'ultimo ingresso</h4>
            <div className="mt-2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] animate-pulse z-10"></div>
            
            <span className="mt-4 text-[7px] uppercase tracking-[0.4em] text-white/30 font-bold z-10">Sfida Runica</span>
          </button>

          <p className="text-[7px] text-center text-white/10 uppercase tracking-[0.2em]">Sblocca la memoria antica</p>
        </div>
      </div>

      <div className="pb-8 flex justify-center opacity-5">
        <span className="text-[5px] uppercase tracking-[0.6em] text-white">Elemental Lab</span>
      </div>
    </div>
  );
};

export default Games;
