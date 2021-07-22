import { Injectable } from '@angular/core';
import { Game, GameWithTeams } from '../models/game';
import { Store } from '../shared/store/store';
import { Stores } from '../shared/store/stores';
import { combineLatest, map, Observable } from 'rxjs';
import { TeamService } from './team.service';
import { Team } from '../models/team';

export interface GameState {
  games: Game[];
}

function filterGameWithUndefinedTeam(game: Game & { teamA?: Team; teamB?: Team }): game is GameWithTeams {
  return !!game.teamA && !!game.teamB;
}

@Injectable()
export class GameService extends Store<GameState> {
  constructor(stores: Stores, private teamService: TeamService) {
    super(stores, 'game', { games: [] });
  }

  selectByIdTournament(idTournament: number): Observable<Game[]> {
    return this.selectState('games').pipe(map(games => games.filter(game => game.idTournament === idTournament)));
  }

  selectByIdTournamentWithTeams(idTournament: number): Observable<GameWithTeams[]> {
    return combineLatest([this.selectByIdTournament(idTournament), this.teamService.selectState('teams')]).pipe(
      map(([games, teams]) =>
        games
          .map(game => ({
            ...game,
            teamA: teams.find(team => team.id === game.idTeamA),
            teamB: teams.find(team => team.id === game.idTeamB),
          }))
          .filter(filterGameWithUndefinedTeam)
      )
    );
  }
}
