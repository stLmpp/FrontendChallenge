import { Injectable } from '@angular/core';
import { Game, GameTeamSide, GameTeamSideKey, GameWithTeams } from '../models/game';
import { Store } from '../shared/store/store';
import { Stores } from '../shared/store/stores';
import { combineLatest, map, Observable } from 'rxjs';
import { TeamService } from './team.service';

export interface GameState {
  games: Game[];
}

@Injectable()
export class GameService extends Store<GameState> {
  constructor(stores: Stores, private teamService: TeamService) {
    super(stores, 'game', { games: [] });
  }

  addMany(dtos: Omit<Game, 'id'>[]): Game[] {
    const games: Game[] = dtos.map(dto => ({ ...dto, id: this.nextUid() }));
    this.updateState(state => ({ ...state, games: [...state.games, ...games] }));
    return games;
  }

  add(dto: Omit<Game, 'id'>): Game {
    const game: Game = { ...dto, id: this.nextUid() };
    this.updateState(state => ({ ...state, games: [...state.games, game] }));
    return game;
  }

  selectByIdTournament(idTournament: number): Observable<Game[]> {
    return this.selectState('games').pipe(map(games => games.filter(game => game.idTournament === idTournament)));
  }

  selectByIdTournamentWithTeams(idTournament: number): Observable<GameWithTeams[]> {
    return combineLatest([this.selectByIdTournament(idTournament), this.teamService.selectState('teams')]).pipe(
      map(([games, teams]) =>
        games.map(game => ({
          ...game,
          teamA: teams.find(team => team.id === game.idTeamA),
          teamB: teams.find(team => team.id === game.idTeamB),
        }))
      )
    );
  }

  setTeam(idTournament: number, idPhase: number, idGame: number, idTeam: number, teamSide: GameTeamSide): void {
    const key = ('idTeam' + teamSide.toUpperCase()) as GameTeamSideKey;
    this.updateState(state => ({
      ...state,
      games: state.games.map(game => {
        if (game.idTournament === idTournament && game.idPhase === idPhase && game.id === idGame) {
          game = { ...game, [key]: idTeam };
        }
        return game;
      }),
    }));
  }
}
