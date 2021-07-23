import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamAddRoutingModule } from './team-add-routing.module';
import { TeamAddComponent } from './team-add.component';
import { TeamSharedModule } from '../team-shared/team-shared.module';

@NgModule({
  declarations: [TeamAddComponent],
  imports: [CommonModule, TeamAddRoutingModule, TeamSharedModule],
})
export class TeamAddModule {}
