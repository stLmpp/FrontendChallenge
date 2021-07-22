import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteParamEnum } from '../models/route-param.enum';
import { TournamentComponent } from './tournament.component';
import { TournamentGuard } from './tournament.guard';
import { TournamentListComponent } from './tournament-list/tournament-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: TournamentListComponent,
  },
  {
    path: `:${RouteParamEnum.idTournament}`,
    component: TournamentComponent,
    canActivate: [TournamentGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournamentRoutingModule {}
