import { Team } from './team';

export interface Game {
  id: number;
  idTournament: number;
  idPhase: number;
  idTeamA?: number;
  idTeamB?: number;
  winner?: number;
}

export interface GameWithTeams extends Game {
  teamA?: Team;
  teamB?: Team;
}

export type GameTeamSide = 'a' | 'b';
export type GameTeamSideKey = `idTeam${Uppercase<GameTeamSide>}`;
