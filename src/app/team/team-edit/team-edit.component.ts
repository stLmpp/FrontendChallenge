import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { map, switchMap } from 'rxjs';
import { RouteParamEnum } from '../../models/route-param.enum';
import { filterNil } from '../../utils/operators/filter-nil';
import { TeamCrudMode } from '../team-shared/team-crud/team-crud.component';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamEditComponent {
  constructor(private activatedRoute: ActivatedRoute, private teamService: TeamService, private router: Router) {}

  readonly team$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.get(RouteParamEnum.idTeam)),
    filterNil(),
    switchMap(idTeam => this.teamService.selectTeam(+idTeam))
  );

  readonly teamCrudMode = TeamCrudMode;

  onSnackBarShow(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute }).then();
  }
}
