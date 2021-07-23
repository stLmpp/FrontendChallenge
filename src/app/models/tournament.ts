import { PhaseWithGames } from './phase';
import { Team } from './team';

export interface Tournament {
  id: number;
  name: string;
  idTeams: number[];
  finished?: Date;
}

export interface TournamentWithTeamsPhases extends Tournament {
  teams: Team[];
  phases: PhaseWithGames[];
  createPhases: boolean;
  cdkDropLists: string[];
  canFinish: boolean;
}
