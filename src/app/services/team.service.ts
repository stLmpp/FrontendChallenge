import { Injectable } from '@angular/core';
import { Store } from '../shared/store/store';
import { Team } from '../models/team';
import { Stores } from '../shared/store/stores';
import { map, Observable } from 'rxjs';

export interface TeamState {
  teams: Team[];
}

@Injectable({ providedIn: 'root' })
export class TeamService extends Store<TeamState> {
  constructor(stores: Stores) {
    super(stores, 'team', { teams: [] });
  }

  private _updateTeam(idItem: number, partial: Partial<Team>): void {
    this.updateState(state => ({
      ...state,
      teams: state.teams.map(team => {
        if (team.id === idItem) {
          team = { ...team, ...partial };
        }
        return team;
      }),
    }));
  }

  add(dto: Omit<Team, 'id'>): Team {
    const team: Team = { ...dto, id: this.nextUid() };
    this.updateState(state => ({ ...state, teams: [...state.teams, team] }));
    return team;
  }

  update(idTeam: number, partial: Partial<Team>): void {
    this._updateTeam(idTeam, partial);
  }

  delete(idTeam: number): void {
    this.updateState(state => ({ ...state, teams: state.teams.filter(team => team.id !== idTeam) }));
  }

  selectTeam(idTeam: number): Observable<Team | undefined> {
    return this.selectState('teams').pipe(map(teams => teams.find(team => team.id === idTeam)));
  }

  getTeam(idTeam: number): Team | undefined {
    return this.getState('teams').find(team => team.id === idTeam);
  }
}
