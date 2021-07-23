import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TeamRoutingModule } from './team-routing.module';
import { GoBackModule } from '../shared/go-back/go-back.module';
import { TeamSharedModule } from './team-shared/team-shared.module';

@NgModule({
  declarations: [TeamComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    GoBackModule,
    TeamSharedModule,
  ],
})
export class TeamModule {}
