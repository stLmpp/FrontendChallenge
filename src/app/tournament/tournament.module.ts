import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentAddComponent } from './tournament-add/tournament-add.component';
import { TournamentComponent } from './tournament.component';

@NgModule({
  declarations: [TournamentAddComponent, TournamentComponent],
  imports: [CommonModule, TournamentRoutingModule],
})
export class TournamentModule {}
