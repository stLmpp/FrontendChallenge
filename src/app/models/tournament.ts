import { GameWithTeams } from './game';
import { TournamentTeam } from './tournament-team';

export interface Tournament {
  id: number;
  name: string;
  idTeams: number[];
  idGames: number[];
}

export interface TournamentWithTeamsGames extends Tournament {
  teams: TournamentTeam[];
  games: GameWithTeams[];
}
