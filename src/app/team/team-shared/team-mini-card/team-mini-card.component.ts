import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Team } from '../../../models/team';

@Component({
  selector: 'app-team-mini-card',
  templateUrl: './team-mini-card.component.html',
  styleUrls: ['./team-mini-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'team-mini-card' },
})
export class TeamMiniCardComponent implements OnChanges {
  constructor(public elementRef: ElementRef<HTMLElement>) {}

  @Input() team?: Team;
  @Input() disabled = false;
  @Input() winner = false;
  @Input() tournamentWinner = false;

  @Output() readonly buttonClick = new EventEmitter<MouseEvent>();

  logoError = false;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes.team;
    if (change && !change.isFirstChange()) {
      this.logoError = false;
    }
  }
}
