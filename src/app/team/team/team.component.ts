import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { map, switchMap, tap } from 'rxjs';
import { RouteParamEnum } from '../../models/route-param.enum';
import { filterNil } from '../../utils/operators/filter-nil';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  logoError = false;
  imageError = false;

  team$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.get(RouteParamEnum.idTeam)),
    filterNil(),
    switchMap(idTeam => this.teamService.selectTeam(+idTeam)),
    tap(() => {
      this.logoError = false;
      this.imageError = false;
      this.changeDetectorRef.markForCheck();
    })
  );
}
