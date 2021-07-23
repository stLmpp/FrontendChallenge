import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TeamCrudMode } from '../team-shared/team-crud/team-crud.component';
import { Team } from '../../models/team';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrls: ['./team-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamAddComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  teamCrudMode = TeamCrudMode;

  onSnackBarShow(team: Team): void {
    this.router.navigate(['../', team.id], { relativeTo: this.activatedRoute }).then();
  }
}
