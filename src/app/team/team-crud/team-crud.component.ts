import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum TeamCrudMode {
  add,
  edit,
}

@Component({
  selector: 'app-team-crud',
  templateUrl: './team-crud.component.html',
  styleUrls: ['./team-crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamCrudComponent {
  constructor(private teamService: TeamService, private matSnackBar: MatSnackBar) {}

  private _team?: Team;

  @ViewChild('firstInput') firstInput!: ElementRef<HTMLInputElement>;

  @Input() mode!: TeamCrudMode;

  @Output() readonly snackbarShow = new EventEmitter<Team>();

  @Input()
  set team(team: Team) {
    this.form.patchValue(team);
    this._team = team;
  }

  readonly form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    subTitle: new FormControl(),
    description: new FormControl('', [Validators.required]),
    logo: new FormControl(),
    image: new FormControl(),
  });
  readonly teamCrudMode = TeamCrudMode;
  readonly nameControl = this.form.get('name') as FormControl;
  readonly descriptionControl = this.form.get('description') as FormControl;

  private _add(): void {
    const formValue: Omit<Team, 'id'> = this.form.value;
    const team = this.teamService.add(formValue);
    this.matSnackBar
      .open('Team added successfully!', 'Show')
      .onAction()
      .subscribe(() => {
        this.snackbarShow.emit(team);
      });
    this.form.reset();
    this.firstInput.nativeElement.focus();
  }

  private _update(): void {
    const team = this._team;
    if (!team) {
      return;
    }
    const formValue: Omit<Team, 'id'> = this.form.value;
    this.teamService.update(team.id, formValue);
    this.matSnackBar
      .open('Team updated successfully!', 'Show')
      .onAction()
      .subscribe(() => {
        this.snackbarShow.emit({ ...team, ...formValue });
      });
  }

  onSave(): void {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === TeamCrudMode.add) {
      this._add();
    } else {
      this._update();
    }
  }
}
