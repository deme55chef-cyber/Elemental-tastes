
import { useState, useEffect } from 'react';
import { Progress } from '../types';

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress>(() => {
    const saved = localStorage.getItem('loom_progress');
    return saved ? JSON.parse(saved) : { completedEpisodes: [], highScores: {} };
  });

  useEffect(() => {
    localStorage.setItem('loom_progress', JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (newProgress: Partial<Progress>) => {
    setProgress(prev => ({ ...prev, ...newProgress }));
  };

  return { progress, updateProgress };
};
