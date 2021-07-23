import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PhaseWithGames } from '../../models/phase';
import { trackById } from '../../utils/track-by';

@Component({
  selector: 'app-tournament-phase',
  templateUrl: './tournament-phase.component.html',
  styleUrls: ['./tournament-phase.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentPhaseComponent {
  @Input() phase!: PhaseWithGames;
  @Input() last = false;
  @Input() tournamentFinished?: Date;

  readonly trackById = trackById;
}
