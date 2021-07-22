import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Team } from '../../../models/team';

@Component({
  selector: 'app-team-mini-card',
  templateUrl: './team-mini-card.component.html',
  styleUrls: ['./team-mini-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'team-mini-card' },
})
export class TeamMiniCardComponent implements OnChanges {
  @Input() team?: Team;
  @Input() disabled = false;
  @Input() winner = false;

  logoError = false;

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes.team;
    if (change && !change.isFirstChange()) {
      this.logoError = false;
    }
  }
}
