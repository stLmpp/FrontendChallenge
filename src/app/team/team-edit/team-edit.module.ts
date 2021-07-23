import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamEditRoutingModule } from './team-edit-routing.module';
import { TeamEditComponent } from './team-edit.component';
import { TeamSharedModule } from '../team-shared/team-shared.module';

@NgModule({
  declarations: [TeamEditComponent],
  imports: [CommonModule, TeamEditRoutingModule, TeamSharedModule],
})
export class TeamEditModule {}
