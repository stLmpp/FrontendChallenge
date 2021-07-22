import { ChangeDetectionStrategy, Component } from '@angular/core';
import { trackById } from '../../utils/track-by';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team';
import { DialogService } from '../../shared/dialog/dialog.service';
import { FormControl } from '@angular/forms';
import { combineLatest, debounceTime, map, Observable, startWith } from 'rxjs';

// TODO maybe pagination?

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamListComponent {
  constructor(private teamService: TeamService, private dialogService: DialogService) {}

  readonly trackById = trackById;
  readonly termControl = new FormControl('');
  readonly term$: Observable<string> = this.termControl.valueChanges.pipe(
    debounceTime(350),
    startWith(''),
    map((term: string) => term.toLowerCase().normalize('NFC'))
  );
  readonly teams$ = combineLatest([this.teamService.selectState('teams'), this.term$]).pipe(
    map(([teams, term]) => {
      if (!term) {
        return teams;
      }
      return teams.filter(team => team.name.toLowerCase().normalize('NFC').includes(term));
    })
  );

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
