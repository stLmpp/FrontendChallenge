import {
  AfterViewInit,
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { PhaseService } from '../../services/phase.service';
import { Game, GameTeamElementKey } from '../../models/game';
import { SquarePath } from 'svg-dom-arrows';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appTournamentPhaseGameTeamConnection]',
})
export class TournamentPhaseGameTeamConnectionDirective implements OnChanges, AfterViewInit, OnDestroy {
  constructor(
    private phaseService: PhaseService,
    private elementRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  private _afterViewInit = false;
  private _squarePath?: SquarePath;
  private _container!: HTMLDivElement;

  @Input('appTournamentPhaseGameTeamConnection') game!: Game;

  private _render(): void {
    if (!this._afterViewInit || !this.game || !this.game.teamAElement || !this.game.teamBElement) {
      return;
    }

    const gameTeamSide = this.phaseService.getNextPhaseGame(this.game.idTournament, this.game.idPhase, this.game.id);
    if (!gameTeamSide) {
      return;
    }
    const [game, teamSide] = gameTeamSide;
    const key = `team${teamSide.toUpperCase()}Element` as GameTeamElementKey;
    const element = game[key];
    if (!element) {
      return;
    }
    this._squarePath?.release();
    this._squarePath = new SquarePath({
      start: {
        element: this.elementRef.nativeElement,
        position: { top: 0.5, left: 1 },
      },
      end: {
        element,
        position: { top: 0.5, left: 0 },
      },
      style: 'stroke:black;stroke-width:1;fill:transparent',
      appendTo: this._container,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const gameChanges = changes.game;
    if (!gameChanges) {
      return;
    }
    const oldGame: Game | undefined = gameChanges.previousValue;
    const newGame: Game = gameChanges.currentValue;
    if (
      !oldGame ||
      oldGame.idTournament !== newGame.idTournament ||
      oldGame.idPhase !== newGame.idPhase ||
      oldGame.id !== newGame.id ||
      oldGame.teamAElement !== newGame.teamAElement ||
      oldGame.teamBElement !== oldGame.teamBElement
    ) {
      this._render();
    }
  }

  ngAfterViewInit(): void {
    const container = this.document.getElementById('tournament-phase-game-team-connection-container') as HTMLDivElement;
    if (container) {
      this._container = container;
    } else {
      this._container = this.renderer2.createElement('div');
      this.renderer2.setStyle(this._container, 'z-index', '-1');
      this.renderer2.setAttribute(this._container, 'id', 'tournament-phase-game-team-connection-container');
      this.renderer2.appendChild(this.document.body, this._container);
    }
    this._afterViewInit = true;
    this._render();
  }

  ngOnDestroy(): void {
    this._squarePath?.release();
  }
}
