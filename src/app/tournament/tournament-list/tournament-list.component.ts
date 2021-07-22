import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { trackById } from '../../utils/track-by';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentListComponent {
  constructor(private tournamentService: TournamentService) {}

  readonly tournaments$ = this.tournamentService.selectState('tournaments');

  readonly trackById = trackById;
}
