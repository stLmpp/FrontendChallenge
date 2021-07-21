import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tournament-add',
  templateUrl: './tournament-add.component.html',
  styleUrls: ['./tournament-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentAddComponent {}
