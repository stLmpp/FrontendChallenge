import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteParamEnum } from '../models/route-param.enum';
import { TournamentComponent } from './tournament.component';
import { TournamentGuard } from './tournament.guard';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./tournament-list/tournament-list.module').then(m => m.TournamentListModule),
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
