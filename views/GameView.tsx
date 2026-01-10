
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Progress } from '../types';

interface Props {
  updateProgress: (p: Partial<Progress>) => void;
  progress: Progress;
}

// ID forniti dall'utente
const PUZZLE_IMAGE_ID = "1JYpNbY-xLV2dMJFWQyqTCjHNv9UTyCPk";
const INTERMEDIATE_GIF_ID = "1cOq9sJGkQMGOfzfIcunRFPl68WOWr6do";
const FINAL_IMAGE_ID = "1Jvcvr9XaaNxt0tWhX-lIZhm_J3xG4cxd";

// Link diretti Google Drive
const RUNE_IMAGE_URL = `https://lh3.googleusercontent.com/d/${PUZZLE_IMAGE_ID}`;
const INTERMEDIATE_GIF_URL = `https://lh3.googleusercontent.com/d/${INTERMEDIATE_GIF_ID}`;
const FINAL_IMAGE_URL = `https://lh3.googleusercontent.com/d/${FINAL_IMAGE_ID}`;

type VictoryPhase = 'none' | 'intermediate' | 'flash' | 'final';

const GameView: React.FC<Props> = ({ updateProgress, progress }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [tiles, setTiles] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [victoryPhase, setVictoryPhase] = useState<VictoryPhase>('none');
  const [shuffling, setShuffling] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Pre-caricamento asset
  useEffect(() => {
    const img = new Image();
    img.src = RUNE_IMAGE_URL;
    img.onload = () => {
      setImageLoaded(true);
      setLoadError(false);
    };
    img.onerror = () => {
      setLoadError(true);
    };

    // Pre-caricamento pergamena e gif
    new Image().src = FINAL_IMAGE_URL;
    new Image().src = INTERMEDIATE_GIF_URL;
  }, []);

  // Gestione sequenza vittoria
  useEffect(() => {
    if (isWon) {
      setVictoryPhase('intermediate');
    }
  }, [isWon]);

  const initPuzzle = useCallback(() => {
    let newTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < 150; i++) {
      const emptyIdx = newTiles.indexOf(8);
      const possibleMoves = [];
      const row = Math.floor(emptyIdx / 3);
      const col = emptyIdx % 3;
      if (row > 0) possibleMoves.push(emptyIdx - 3);
      if (row < 2) possibleMoves.push(emptyIdx + 3);
      if (col > 0) possibleMoves.push(emptyIdx - 1);
      if (col < 2) possibleMoves.push(emptyIdx + 1);
      const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      [newTiles[emptyIdx], newTiles[move]] = [newTiles[move], newTiles[emptyIdx]];
    }
    setTiles(newTiles);
    setShuffling(false);
    setIsWon(false);
    setVictoryPhase('none');
  }, []);

  useEffect(() => {
    if (id === 'rune-puzzle') {
      initPuzzle();
    }
  }, [id, initPuzzle]);

  const handleTileClick = (index: number) => {
    if (isWon || shuffling || !imageLoaded || showHelp) return;
    const emptyIdx = tiles.indexOf(8);
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIdx / 3);
    const emptyCol = emptyIdx % 3;

    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIdx]] = [newTiles[emptyIdx], newTiles[index]];
      setTiles(newTiles);
      if (newTiles.every((t, i) => t === i)) {
        setIsWon(true);
        updateProgress({
          highScores: { ...progress.highScores, [id!]: (progress.highScores[id!] || 0) + 1 }
        });
      }
    }
  };

  const handlePhaseTap = () => {
    if (victoryPhase === 'intermediate') {
      setVictoryPhase('flash');
      setTimeout(() => {
        setVictoryPhase('final');
      }, 300); // Durata del flash bianco
    }
  };

  const toggleHelp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowHelp(!showHelp);
  };

  if (loadError) {
    return (
      <div className="h-full bg-black flex flex-col items-center justify-center p-10 text-center">
        <p className="text-white/40 text-xs mb-4">Errore di connessione al sigillo.</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white">Riconnetti</button>
      </div>
    );
  }

  if (!imageLoaded) {
    return (
      <div className="h-full bg-black flex flex-col items-center justify-center">
        <div className="w-6 h-6 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
        <p className="text-[8px] uppercase tracking-[0.4em] text-white/20">Invocazione...</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-black flex flex-col relative overflow-hidden font-sans" onClick={handlePhaseTap}>
      
      {/* Game Header */}
      <div className={`p-6 flex justify-between items-center z-20 transition-opacity duration-500 ${isWon ? 'opacity-0' : 'opacity-100'}`}>
        <button onClick={() => navigate('/games')} className="w-8 h-8 flex items-center justify-center text-white/20 active:scale-90 transition-transform">✕</button>
        <span className="text-[8px] uppercase tracking-[0.5em] text-cyan-400/30 font-bold">Laboratorio Runico</span>
        <button 
          onClick={toggleHelp}
          className="px-3 py-1 rounded-full border border-white/10 text-[8px] uppercase tracking-widest text-white/40 active:bg-white/10 transition-colors"
        >
          Aiuto
        </button>
      </div>

      {/* Puzzle Grid */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 pb-20">
        <div 
          className={`grid grid-cols-3 gap-[2px] w-full max-w-[320px] aspect-square transition-all duration-[1000ms] transform ease-in-out ${isWon ? 'opacity-0 scale-150 blur-xl' : 'opacity-100 scale-100'}`}
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          {tiles.map((tileValue, index) => {
            if (tileValue === 8) return <div key="empty" className="bg-black/80"></div>;
            const originalRow = Math.floor(tileValue / 3);
            const originalCol = tileValue % 3;
            return (
              <div
                key={tileValue}
                onClick={() => handleTileClick(index)}
                className="relative cursor-pointer transition-all duration-300 active:brightness-150 border border-cyan-500/10"
                style={{
                  backgroundImage: `url(${RUNE_IMAGE_URL})`,
                  backgroundSize: '300% 300%',
                  backgroundPosition: `${originalCol * 50}% ${originalRow * 50}%`,
                }}
              />
            );
          })}
        </div>
        {!isWon && <p className="mt-12 text-[7px] uppercase tracking-[0.3em] text-white/10 animate-pulse text-center">Ricomponi il sigillo</p>}
      </div>

      {/* Help Overlay (Solution) */}
      {showHelp && !isWon && (
        <div 
          className="absolute inset-0 z-40 bg-black/90 flex flex-col items-center justify-center p-8 animate-in fade-in duration-300"
          onClick={toggleHelp}
        >
          <img src={RUNE_IMAGE_URL} className="w-full max-w-[320px] aspect-square object-cover border border-white/20" alt="Soluzione" />
          <p className="mt-12 text-[8px] uppercase tracking-[0.4em] text-white/40">Tocca per tornare</p>
        </div>
      )}

      {/* Victory sequence layers */}
      {isWon && (
        <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
          
          {/* 1. Intermediate GIF (Until Tap) */}
          {victoryPhase === 'intermediate' && (
            <div className="absolute inset-0 z-[65] animate-in fade-in duration-500 bg-black flex flex-col">
              {/* Scritta blu lampeggiante sopra la GIF */}
              <div className="absolute top-[15%] left-0 right-0 text-center z-10">
                <h2 className="text-[14px] sm:text-[18px] uppercase tracking-[0.8em] text-cyan-400 font-bold animate-pulse brightness-150">
                  Sigillo Attivato
                </h2>
              </div>

              <img src={INTERMEDIATE_GIF_URL} className="w-full h-full object-cover" alt="" />
              
              <div className="absolute inset-0 bg-black/30"></div>
              
              <div className="absolute bottom-12 left-0 right-0 text-center animate-pulse">
                <p className="text-[8px] uppercase tracking-[0.6em] text-white/50">Tocca per procedere</p>
              </div>
            </div>
          )}

          {/* 2. Flash */}
          {victoryPhase === 'flash' && (
            <div className="absolute inset-0 bg-white z-[60] animate-in fade-in duration-100"></div>
          )}

          {/* 3. Final Image (Static + Button) */}
          {victoryPhase === 'final' && (
            <div className="absolute inset-0 z-[70] animate-in fade-in duration-1000 bg-black flex flex-col overflow-hidden">
              <div className="relative flex-1 overflow-hidden">
                <img 
                  src={FINAL_IMAGE_URL} 
                  className="w-full h-full object-contain"
                  alt="Pergamena Finale"
                />
              </div>

              {/* Footer con pulsante */}
              <div className="p-8 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col items-center">
                <button 
                  onClick={(e) => { e.stopPropagation(); navigate('/games'); }}
                  className="w-full max-w-xs py-5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.4em] text-white font-bold backdrop-blur-xl active:scale-95 transition-all shadow-xl"
                >
                  Torna agli indizi
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      <style>{`
        .grid > div { aspect-ratio: 1 / 1; }
      `}</style>
    </div>
  );
};

export default GameView;
