import { Injectable } from '@angular/core';
import { Tournament, TournamentWithTeamsGames } from '../models/tournament';
import { Store } from '../store/store';
import { Stores } from '../store/stores';
import { TeamService } from './team.service';
import { combineLatest, map, Observable } from 'rxjs';
import { GameService } from './game.service';
import { Team } from '../models/team';
import { filterNil } from '../utils/operators/filter-nil';

export interface TournamentState {
  tournaments: Tournament[];
}

@Injectable()
export class TournamentService extends Store<TournamentState> {
  constructor(stores: Stores, private teamService: TeamService, private gameService: GameService) {
    super(stores, 'tournament', { tournaments: [] });
  }

  add(dto: Omit<Tournament, 'id' | 'idTeams' | 'idGames'>): Tournament {
    const tournament: Tournament = { ...dto, id: this.nextUid(), idTeams: [], idGames: [] };
    this.updateState(state => ({ ...state, tournaments: [...state.tournaments, tournament] }));
    return tournament;
  }

  selectTournament(idTournament: number): Observable<Tournament | undefined> {
    return this.selectState('tournaments').pipe(
      map(tournaments => tournaments.find(tournament => tournament.id === idTournament))
    );
  }

  selectTournamentWithTeamsOrCreate(idTournament: number): Observable<TournamentWithTeamsGames> {
    return combineLatest([
      this.selectTournament(idTournament),
      this.teamService.selectState('teams'),
      this.gameService.selectByIdTournamentWithTeams(idTournament),
    ]).pipe(
      map(([tournament, teams, games]) => {
        if (!tournament) {
          this.add({ name: 'New tournament' });
          return undefined;
        }
        return {
          ...tournament,
          teams: teams
            .filter(team => tournament.idTeams.includes(team.id))
            .map(team => ({
              ...team,
              removable: games.some(game => game.idTeamA === team.id || game.idTeamB === team.id),
            })),
          games,
        };
      }),
      filterNil()
    );
  }

  selectTeamsAvailable(idTournament: number): Observable<Team[]> {
    return combineLatest([
      this.selectTournament(idTournament).pipe(filterNil()),
      this.teamService.selectState('teams'),
    ]).pipe(map(([tournament, teams]) => teams.filter(team => !tournament.idTeams.includes(team.id))));
  }
}
