import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamAddComponent } from './team-add.component';

const routes: Routes = [
  {
    path: '',
    component: TeamAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamAddRoutingModule {}
