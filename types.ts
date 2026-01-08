
export interface Episode {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  content: string[];
  theme: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Progress {
  completedEpisodes: string[];
  episodeProgress: Record<string, number>;
  highScores: Record<string, number>;
  customLogo?: string;
  customVideo?: string; // Nuova proprietà per il video personalizzato (Base64)
}
