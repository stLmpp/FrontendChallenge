import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TournamentTeamsComponent } from './tournament-teams/tournament-teams.component';
import { ArrayModule } from '../shared/array/array.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TeamSharedModule } from '../team/team-shared/team-shared.module';
import { TournamentPhaseComponent } from './tournament-phase/tournament-phase.component';
import { TournamentPhaseGameTeamComponent } from './tournament-phase-game-team/tournament-phase-game-team.component';
import { FormsModule } from '@angular/forms';
import { TournamentPhaseGameTeamConnectionDirective } from './tournament-phase-game-team/tournament-phase-game-team-connection.directive';

@NgModule({
  declarations: [
    TournamentComponent,
    TournamentTeamsComponent,
    TournamentPhaseComponent,
    TournamentPhaseGameTeamComponent,
    TournamentPhaseGameTeamConnectionDirective,
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    TeamSharedModule,
    DragDropModule,
    MatChipsModule,
    MatAutocompleteModule,
    ArrayModule,
    FormsModule,
  ],
})
export class TournamentModule {}
