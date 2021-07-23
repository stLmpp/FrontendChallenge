import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { Team } from '../../models/team';
import { CdkDragDrop, CdkDragEnter } from '@angular/cdk/drag-drop';
import { GameService } from '../../services/game.service';
import { Game, GameTeamSide } from '../../models/game';
import { PhaseService } from '../../services/phase.service';
import { TeamMiniCardComponent } from '../../team/team-shared/team-mini-card/team-mini-card.component';

@Component({
  selector: 'app-tournament-phase-game-team',
  templateUrl: './tournament-phase-game-team.component.html',
  styleUrls: ['./tournament-phase-game-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'tournament-phase-game-team' },
})
export class TournamentPhaseGameTeamComponent implements AfterViewInit {
  constructor(private gameService: GameService, private phaseService: PhaseService) {}

  @Input() game!: Game;
  @Input() idTeamWinner?: number;
  @Input() team?: Team;
  @Input() tournamentWinner = false;
  @Input() teamSide!: GameTeamSide;
  @Input() disabled = false;

  @ViewChild(TeamMiniCardComponent) teamMiniCardComponent!: TeamMiniCardComponent;

  teamDrag: Team | undefined = undefined;

  onCdkDropListEntered($event: CdkDragEnter<Team>): void {
    this.teamDrag = $event.item.data;
  }

  onCdkDropListExited(): void {
    this.teamDrag = undefined;
  }

  onCdkDropListDropped($event: CdkDragDrop<Team, Team>): void {
    this.teamDrag = undefined;
    this.gameService.setTeam(
      this.game.idTournament,
      this.game.idPhase,
      this.game.id,
      $event.item.data.id,
      this.teamSide
    );
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
