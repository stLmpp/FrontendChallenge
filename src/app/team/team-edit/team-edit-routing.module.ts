import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamEditComponent } from './team-edit.component';

const routes: Routes = [
  {
    path: '',
    component: TeamEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamEditRoutingModule {}
