import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamAddRoutingModule } from './team-add-routing.module';
import { TeamAddComponent } from './team-add.component';
import { TeamSharedModule } from '../team-shared/team-shared.module';
import { GoBackModule } from '../../shared/go-back/go-back.module';

@NgModule({
  declarations: [TeamAddComponent],
  imports: [CommonModule, TeamAddRoutingModule, TeamSharedModule, GoBackModule],
})
export class TeamAddModule {}
