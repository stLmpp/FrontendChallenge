import { Injectable } from '@angular/core';
import { Phase, PhaseWithGames } from '../models/phase';
import { Store } from '../shared/store/store';
import { Stores } from '../shared/store/stores';
import { combineLatest, map, Observable } from 'rxjs';
import { GameService } from './game.service';
import { resolveUpdate } from '../utils/utils';
import { Game, GameTeamSide, GameTeamSideKey } from '../models/game';

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

  getNextPhaseGame(idTournament: number, idPhase: number, idGame: number): [Game, GameTeamSide] | undefined {
    const phases = this.getState('phases').filter(_phase => _phase.idTournament === idTournament);
    if (!phases.length) {
      return;
    }
    const phase = phases.find(_phase => _phase.id === idPhase);
    if (!phase) {
      return;
    }
    const games = this.gameService.getGamesByIdPhase(idTournament, idPhase);
    const gameIndex = games.findIndex(game => game.id === idGame);
    if (gameIndex === -1) {
      return;
    }
    const nextIndexDivision = gameIndex / 2;
    const nextIndex = Math.floor(nextIndexDivision);
    const nextPhase = phases.find(_phase => _phase.id !== idPhase && _phase.number === phase.number + 1);
    if (!nextPhase) {
      return;
    }
    const nextGames = this.gameService.getGamesByIdPhase(idTournament, nextPhase.id);
    const teamSide: GameTeamSide = nextIndexDivision % 1 ? 'b' : 'a';
    return [nextGames[nextIndex], teamSide];
  }

  setTeamWinnerAndAdvanceToNextPhase(idTournament: number, idPhase: number, idGame: number, idTeam: number): void {
    const gameTeamSide = this.getNextPhaseGame(idTournament, idPhase, idGame);
    if (!gameTeamSide) {
      return;
    }
    const [nextGame, teamSide] = gameTeamSide;
    this.gameService.update(idTournament, idPhase, idGame, { winner: idTeam });
    const key: GameTeamSideKey = `idTeam${teamSide.toUpperCase()}` as GameTeamSideKey;
    this.gameService.update(idTournament, nextGame.idPhase, nextGame.id, { [key]: idTeam });
  }

  unsetTeamWinner(idTournament: number, idPhase: number, idGame: number, idTeam: number, teamSide: GameTeamSide): void {
    const phases = this.getState('phases').filter(_phase => _phase.idTournament === idTournament);
    if (!phases.length) {
      return;
    }
    const phase = phases.find(_phase => _phase.id === idPhase);
    if (!phase) {
      return;
    }
    const previousPhase = phases.find(_phase => _phase.id !== idPhase && _phase.number === phase.number - 1);
    if (!previousPhase) {
      return;
    }
    const previousGames = this.gameService.getGamesByIdPhase(idTournament, previousPhase.id);
    const previousGame = previousGames.find(game => game.winner === idTeam);
    if (!previousGame) {
      return;
    }
    this.gameService.update(idTournament, previousPhase.id, previousGame.id, { winner: undefined });
    const key = `idTeam${teamSide.toUpperCase()}` as GameTeamSideKey;
    this.gameService.update(idTournament, idPhase, idGame, { [key]: undefined });
  }

  deleteByIdTournament(idTournament: number): void {
    this.updateState(state => ({
      ...state,
      phases: state.phases.filter(phase => phase.idTournament !== idTournament),
    }));
    this.gameService.deleteByIdTourmanent(idTournament);
  }
}
