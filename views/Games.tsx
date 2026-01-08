
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GAMES } from '../constants';
import { Progress } from '../types';

interface Props {
  progress: Progress;
}

const Games: React.FC<Props> = ({ progress }) => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-[#000000]">
      <div className="safe-top p-6 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="p-2 -ml-2 text-2xl text-white">←</button>
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-400">Test Sensoriali</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-4">
        {GAMES.map((game) => (
          <button 
            key={game.id}
            onClick={() => navigate(`/games/${game.id}`)}
            className="w-full p-6 bg-zinc-950 border border-white/10 rounded-3xl flex items-center gap-6 active:scale-[0.98] transition-all shadow-lg"
          >
            <div className={`w-16 h-16 ${game.color} rounded-2xl flex items-center justify-center text-3xl shadow-xl`}>
              {game.icon}
            </div>
            <div className="text-left flex-1">
              <h3 className="text-xl font-bold mb-1 text-white">{game.title}</h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{game.description}</p>
              {progress.highScores[game.id] !== undefined && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-[1px] flex-1 bg-white/10"></div>
                  <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-tighter">Record: {progress.highScores[game.id]}</p>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Games;
