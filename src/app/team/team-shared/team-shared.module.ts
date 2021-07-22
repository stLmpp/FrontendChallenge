import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMiniCardComponent } from './team-mini-card/team-mini-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TeamMiniCardComponent],
  exports: [TeamMiniCardComponent],
  imports: [CommonModule, MatTooltipModule, MatIconModule, MatButtonModule],
})
export class TeamSharedModule {}
