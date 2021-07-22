import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Team } from '../../models/team';
import { CdkDragDrop, CdkDragEnter } from '@angular/cdk/drag-drop';
import { GameService } from '../../services/game.service';
import { GameTeamSide } from '../../models/game';

@Component({
  selector: 'app-tournament-phase-game-team',
  templateUrl: './tournament-phase-game-team.component.html',
  styleUrls: ['./tournament-phase-game-team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'tournament-phase-game-team' },
})
export class TournamentPhaseGameTeamComponent {
  constructor(private gameService: GameService) {}

  @Input() idTournament!: number;
  @Input() idPhase!: number;
  @Input() idGame!: number;
  @Input() team?: Team;
  @Input() winner = false;
  @Input() teamSide!: GameTeamSide;
  @Input() disabled = false;

  teamDrag: Team | undefined = undefined;

  onCdkDropListEntered($event: CdkDragEnter<Team>): void {
    this.teamDrag = $event.item.data;
  }

  onCdkDropListExited(): void {
    this.teamDrag = undefined;
  }

  onCdkDropListDropped($event: CdkDragDrop<Team, Team>): void {
    this.teamDrag = undefined;
    this.gameService.setTeam(this.idTournament, this.idPhase, this.idGame, $event.item.data.id, this.teamSide);
  }
}
