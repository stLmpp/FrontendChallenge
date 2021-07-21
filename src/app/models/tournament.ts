import { Team } from './team';

export interface Tournament {
  id: number;
  name: string;
  teams: Team[];
}
