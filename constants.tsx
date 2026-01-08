
import { Episode, Game } from './types';

export const EPISODES: Episode[] = [
  {
    id: 'e1',
    title: 'Brace Cremisi',
    subtitle: 'Il pungente morso del calore del deserto.',
    image: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=format&fit=crop&q=80&w=800',
    theme: 'rose',
    content: [
      "Il primo morso del frutto essiccato al sole è una scintilla sulla lingua.",
      "Nella Valle del Sale, si scambiano segreti per una singola goccia di spezie.",
      "Il calore non ti tocca soltanto; ricorda il tuo nome.",
      "Porto la fiamma in un piccolo vaso di vetro sotto le costole.",
      "Tocca la brace per sentire il calore del primo raccolto."
    ]
  },
  {
    id: 'e2',
    title: 'Sale Ceruleo',
    subtitle: 'Un soffio freddo dalle trincee profonde.',
    image: 'https://images.unsplash.com/photo-1518481612222-68bbe828ebd1?auto=format&fit=crop&q=80&w=800',
    theme: 'cyan',
    content: [
      "L'oceano conserva il ricordo di tutto ciò che non ha mai raggiunto la riva.",
      "Qui, l'aria sa di minerale e di luce lunare ghiacciata.",
      "Non ci immergiamo per le perle, ma per la chiarezza che si trova nel profondo silenzio.",
      "Ogni onda è una parola in una lingua parlata solo dalla marea.",
      "Il sale rimane anche quando l'acqua è svanita."
    ]
  },
  {
    id: 'e3',
    title: 'Umami di Smeraldo',
    subtitle: 'Il profumo intenso della terra umida dopo la pioggia.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800',
    theme: 'emerald',
    content: [
      "Il muschio cresce più velocemente delle storie che raccontiamo sulla foresta.",
      "Il suolo è denso della storia di foglie cadute e vecchie radici.",
      "C'è una ricchezza qui che non richiede luce per fiorire.",
      "Se ascolti, il terreno vibra per lo sforzo di esistere.",
      "Fai un respiro. La foresta ti sta guardando respirare."
    ]
  }
];

export const GAMES: Game[] = [
  {
    id: 'spice',
    title: 'Acchiappa Spezie',
    description: 'Cattura il calore che cade.',
    icon: '🌶️',
    color: 'bg-rose-600'
  },
  {
    id: 'mist',
    title: 'Trama di Nebbia',
    description: 'Connetti le scie di vapore.',
    icon: '🌫️',
    color: 'bg-cyan-600'
  },
  {
    id: 'bitter',
    title: 'Eco Amaro',
    description: 'Sequenzia le note scure.',
    icon: '☕',
    color: 'bg-emerald-800'
  }
];
