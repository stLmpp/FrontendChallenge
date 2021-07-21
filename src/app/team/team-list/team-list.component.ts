import { ChangeDetectionStrategy, Component } from '@angular/core';
import { trackById } from '../../utils/track-by';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team';
import { DialogService } from '../../dialog/dialog.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamListComponent {
  constructor(private teamService: TeamService, private dialogService: DialogService) {}

  readonly teams$ = this.teamService.selectState('teams');

  readonly trackById = trackById;
  // TODO maybe pagination?

  onDelete($event: MouseEvent, team: Team): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.dialogService
      .confirm({
        title: `Delete team ${team.name}?`,
        content: `This action can't be undone`,
        btnYes: 'Delete',
        btnNo: 'Close',
      })
      .subscribe(result => {
        if (result) {
          this.teamService.delete(team.id);
        }
      });
  }
}
