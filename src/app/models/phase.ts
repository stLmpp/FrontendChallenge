import { GameWithTeams } from './game';

export interface Phase {
  id: number;
  number: number;
  idTournament: number;
}

export interface PhaseWithGames extends Phase {
  games: GameWithTeams[];
}
