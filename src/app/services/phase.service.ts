import { Injectable } from '@angular/core';
import { Phase, PhaseWithGames } from '../models/phase';
import { Store } from '../shared/store/store';
import { Stores } from '../shared/store/stores';
import { combineLatest, map, Observable } from 'rxjs';
import { GameService } from './game.service';
import { resolveUpdate } from '../utils/utils';

export interface PhaseState {
  phases: Phase[];
}

@Injectable()
export class PhaseService extends Store<PhaseState> {
  constructor(stores: Stores, private gameService: GameService) {
    super(stores, 'phase', { phases: [] });
  }

  private _updatePhase(idPhase: number, partial: Partial<Phase> | ((phase: Phase) => Phase)): void {
    const update = resolveUpdate(partial);
    this.updateState(state => ({
      ...state,
      phases: state.phases.map(phase => {
        if (phase.id === idPhase) {
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

  selectByIdTournamentWithGames(idTournament: number): Observable<PhaseWithGames[]> {
    return combineLatest([
      this.gameService.selectByIdTournamentWithTeams(idTournament),
      this.selectState('phases'),
    ]).pipe(
      map(([games, phases]) =>
        phases.map(phase => ({ ...phase, games: games.filter(game => game.idPhase === phase.id) }))
      )
    );
  }
}
