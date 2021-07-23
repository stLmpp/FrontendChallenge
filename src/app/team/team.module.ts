import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamComponent } from './team.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  declarations: [TeamComponent],
  imports: [CommonModule, TeamRoutingModule, MatButtonModule, MatCardModule, MatIconModule, MatTooltipModule],
})
export class TeamModule {}
