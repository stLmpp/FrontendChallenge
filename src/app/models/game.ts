import { Team } from './team';

export interface Game {
  id: number;
  idTournament: number;
  idTeamA: number;
  idTeamB: number;
  winner?: number;
}

export interface GameWithTeams extends Game {
  teamA: Team;
  teamB: Team;
}
