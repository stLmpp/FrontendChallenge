import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteParamEnum } from '../models/route-param.enum';
import { TeamAddComponent } from './team-add/team-add.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  {
    path: 'add',
    component: TeamAddComponent,
  },
  {
    path: `:${RouteParamEnum.idTeam}`,
    children: [
      {
        path: '',
        component: TeamComponent,
      },
      {
        path: 'edit',
        component: TeamEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
