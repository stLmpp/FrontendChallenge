import { Injectable } from '@angular/core';
import { Phase, PhaseWithGames } from '../models/phase';
import { Store } from '../shared/store/store';
import { Stores } from '../shared/store/stores';
import { combineLatest, map, Observable } from 'rxjs';
import { GameService } from './game.service';
import { resolveUpdate } from '../utils/utils';
import { GameTeamSideKey } from '../models/game';

export interface PhaseState {
  phases: Phase[];
}

@Injectable({ providedIn: 'root' })
export class PhaseService extends Store<PhaseState> {
  constructor(stores: Stores, private gameService: GameService) {
    super(stores, 'phase', { phases: [] });
  }

  private _updatePhase(
    idTournament: number,
    idPhase: number,
    partial: Partial<Phase> | ((phase: Phase) => Phase)
  ): void {
    const update = resolveUpdate(partial);
    this.updateState(state => ({
      ...state,
      phases: state.phases.map(phase => {
        if (phase.idTournament === idTournament && phase.id === idPhase) {
          phase = update(phase);
        }
        return phase;
      }),
    }));
  }

  addMany(dtos: Omit<Phase, 'id'>[]): Phase[] {
    const phases: Phase[] = dtos.map(dto => ({ ...dto, id: this.nextUid() }));
    this.updateState(state => ({ ...state, phases: [...state.phases, ...phases] }));
    return phases;
  }

  add(dto: Omit<Phase, 'id'>): Phase {
    const phase: Phase = { ...dto, id: this.nextUid() };
    this.updateState(state => ({ ...state, phases: [...state.phases, phase] }));
    return phase;
  }

  selectByIdTournament(idTournament: number): Observable<Phase[]> {
    return this.selectState('phases').pipe(map(phases => phases.filter(phase => phase.idTournament === idTournament)));
  }

  selectByIdTournamentWithGames(idTournament: number): Observable<PhaseWithGames[]> {
    return combineLatest([
      this.gameService.selectByIdTournamentWithTeams(idTournament),
      this.selectByIdTournament(idTournament),
    ]).pipe(
      map(([games, phases]) =>
        phases.map(phase => ({ ...phase, games: games.filter(game => game.idPhase === phase.id) }))
      )
    );
  }

  setTeamWinnerAndAdvanceToNextPhase(idTournament: number, idPhase: number, idGame: number, idTeam: number): void {
    const phases = this.getState('phases').filter(_phase => _phase.idTournament === idTournament);
    if (!phases.length) {
      return;
    }
    const phase = phases.find(_phase => _phase.id === idPhase);
    if (!phase) {
      return;
    }
    this.gameService.update(idTournament, idPhase, idGame, { winner: idTeam });
    const games = this.gameService.getGamesByIdPhase(idTournament, idPhase);
    const gameIndex = games.findIndex(game => game.id === idGame);
    if (gameIndex === -1) {
      return;
    }
    const nextIndex = Math.floor(gameIndex / 2);
    const nextPhase = phases.find(_phase => _phase.id !== idPhase && _phase.number === phase.number + 1);
    if (!nextPhase) {
      return;
    }
    const nextGames = this.gameService.getGamesByIdPhase(idTournament, nextPhase.id);
    const nextGame = nextGames[nextIndex];
    if (!nextGame) {
      return;
    }
    const key: GameTeamSideKey = !nextGame.idTeamA ? 'idTeamA' : 'idTeamB';
    this.gameService.update(idTournament, nextPhase.id, nextGame.id, { [key]: idTeam });
  }
}
