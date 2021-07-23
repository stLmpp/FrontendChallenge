import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteParamEnum } from '../models/route-param.enum';
import { TeamComponent } from './team.component';

const routes: Routes = [
  {
    path: 'add',
    loadChildren: () => import('./team-add/team-add.module').then(m => m.TeamAddModule),
  },
  {
    path: 'list',
    loadChildren: () => import('./team-list/team-list.module').then(m => m.TeamListModule),
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
        loadChildren: () => import('./team-edit/team-edit.module').then(m => m.TeamEditModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamRoutingModule {}
