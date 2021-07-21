import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentAddComponent } from './tournament-add/tournament-add.component';
import { RouteParamEnum } from '../models/route-param.enum';

const routes: Routes = [
  {
    path: 'add',
    component: TournamentAddComponent,
  },
  {
    path: `:${RouteParamEnum.idTournament}`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentRoutingModule {}
