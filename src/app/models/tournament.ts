import { PhaseWithGames } from './phase';
import { Team } from './team';

export interface Tournament {
  id: number;
  name: string;
  idTeams: number[];
  finished?: Date;
  idTeamWinner?: number;
}

export interface TournamentWithWinner extends Tournament {
  teamWinner?: Team;
}

export interface TournamentWithTeamsPhases extends TournamentWithWinner {
  teams: Team[];
  phases: PhaseWithGames[];
  createPhases: boolean;
  cdkDropLists: string[];
  canFinish: boolean;
}
