import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { Team } from '../../models/team';
import { CdkDragDrop, CdkDragEnter } from '@angular/cdk/drag-drop';
import { GameService } from '../../services/game.service';
import { Game, GameTeamSide } from '../../models/game';
import { PhaseService } from '../../services/phase.service';
import { TeamMiniCardComponent } from '../../team/team-shared/team-mini-card/team-mini-card.component';
import { TournamentPhaseGameTeamConnectionService } from './tournament-phase-game-team-connection.service';

@Component({
  selector: 'app-tournament-phase-game-team',
  templateUrl: './tournament-phase-game-team.component.html',
  styleUrls: ['./tournament-phase-game-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'tournament-phase-game-team' },
})
export class TournamentPhaseGameTeamComponent implements AfterViewInit {
  constructor(
    private gameService: GameService,
    private phaseService: PhaseService,
    private tournamentPhaseGameTeamConnectionService: TournamentPhaseGameTeamConnectionService
  ) {}

  @Input() phaseNumber!: number;
  @Input() game!: Game;
  @Input() idTeamWinner?: number;
  @Input() team?: Team;
  @Input() tournamentWinner = false;
  @Input() teamSide!: GameTeamSide;
  @Input() disabled = false;
  @Input() tournamentFinished?: Date;

  @ViewChild(TeamMiniCardComponent) readonly teamMiniCardComponent!: TeamMiniCardComponent;

  teamDrag: Team | undefined = undefined;

  onCdkDropListEntered($event: CdkDragEnter<Team>): void {
    this.teamDrag = $event.item.data;
    this.tournamentPhaseGameTeamConnectionService.redrawConnections();
  }

  onCdkDropListExited(): void {
    this.teamDrag = undefined;
    this.tournamentPhaseGameTeamConnectionService.redrawConnections();
  }

  onCdkDropListDropped($event: CdkDragDrop<Team, Team>): void {
    if (this.team) {
      return;
    }
    this.teamDrag = undefined;
    this.gameService.setTeam(
      this.game.idTournament,
      this.game.idPhase,
      this.game.id,
      $event.item.data.id,
      this.teamSide
    );
    this.tournamentPhaseGameTeamConnectionService.redrawConnections();
  }

  onAdvanceButtonClick(): void {
    if (!this.team) {
      return;
    }
    this.phaseService.setTeamWinnerAndAdvanceToNextPhase(
      this.game.idTournament,
      this.game.idPhase,
      this.game.id,
      this.team.id
    );
  }

  onDeleteButtonClick(): void {
    if (!this.team) {
      return;
    }
    if (this.phaseNumber === 1) {
      this.gameService.setTeam(this.game.idTournament, this.game.idPhase, this.game.id, undefined, this.teamSide);
    } else {
      this.phaseService.unsetTeamWinner(
        this.game.idTournament,
        this.game.idPhase,
        this.game.id,
        this.team.id,
        this.teamSide
      );
    }
  }

  ngAfterViewInit(): void {
    this.gameService.setTeamElement(
      this.game.idTournament,
      this.game.idPhase,
      this.game.id,
      this.teamSide,
      this.teamMiniCardComponent.elementRef.nativeElement
    );
  }
}
