
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Progress } from '../types';

interface Props {
  updateProgress: (p: Partial<Progress>) => void;
  progress: Progress;
}

interface Target {
  id: number;
  x: number;
  y: number;
  size: number;
  createdAt: number;
}

const GameView: React.FC<Props> = ({ updateProgress, progress }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targets, setTargets] = useState<Target[]>([]);
  const nextTargetId = useRef(0);

  const spawnTarget = useCallback(() => {
    const newTarget: Target = {
      id: nextTargetId.current++,
      x: 15 + Math.random() * 70,
      y: 25 + Math.random() * 50,
      size: 45 + Math.random() * 35,
      createdAt: Date.now()
    };
    setTargets(prev => [...prev, newTarget]);
  }, []);

  const handleTap = (targetId: number) => {
    setScore(s => s + 1);
    setTargets(prev => prev.filter(t => t.id !== targetId));
  };

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsPlaying(false);
          const currentBest = progress.highScores[id!] || 0;
          if (score > currentBest) {
            updateProgress({
              highScores: { ...progress.highScores, [id!]: score }
            });
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    const spawner = setInterval(() => {
      if (targets.length < 5) spawnTarget();
    }, 650);

    return () => {
      clearInterval(timer);
      clearInterval(spawner);
    };
  }, [isPlaying, targets.length, spawnTarget, progress.highScores, score, id, updateProgress]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      const now = Date.now();
      setTargets(prev => prev.filter(t => now - t.createdAt < 1800));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setTargets([]);
    setIsPlaying(true);
  };

  return (
    <div className="h-full bg-[#000000] flex flex-col relative overflow-hidden">
      <div className="safe-top p-6 flex justify-between items-center z-10">
        <button onClick={() => navigate('/games')} className="text-white/40 p-2">✕</button>
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">Punteggio</p>
          <p className="text-2xl font-bold text-white">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">Scadenza</p>
          <p className="text-2xl font-bold text-white">{timeLeft}s</p>
        </div>
      </div>

      {!isPlaying ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center z-10 bg-black/90 backdrop-blur-md">
          <h2 className="text-4xl font-serif mb-4 text-white">Focalizza i Sensi</h2>
          <p className="text-zinc-500 mb-10 max-w-xs uppercase tracking-[0.2em] text-[10px] leading-loose">
            Cattura l'essenza prima che svanisca. Tocchi rapidi per risultati intensi.
          </p>
          <button 
            onClick={startGame}
            className="w-full max-w-xs py-6 bg-white text-black rounded-2xl font-bold uppercase tracking-widest text-xs active:scale-95 transition-transform shadow-2xl"
          >
            Inizia il Test
          </button>
        </div>
      ) : (
        <div className="flex-1 relative">
          {targets.map(t => (
            <button
              key={t.id}
              onClick={() => handleTap(t.id)}
              className="absolute animate-pulse"
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: `${t.size}px`,
                height: `${t.size}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="w-full h-full rounded-full bg-white/10 border border-white/30 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                 <div className="w-1/3 h-1/3 rounded-full bg-white"></div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameView;
