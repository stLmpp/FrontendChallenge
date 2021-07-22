import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { TournamentTeamsComponent } from './tournament-teams/tournament-teams.component';
import { ArrayModule } from '../shared/array/array.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TeamSharedModule } from '../team/team-shared/team-shared.module';
import { TournamentPhaseComponent } from './tournament-phase/tournament-phase.component';
import { TournamentPhaseGameTeamComponent } from './tournament-phase-game-team/tournament-phase-game-team.component';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    TournamentComponent,
    TournamentTeamsComponent,
    TournamentPhaseComponent,
    TournamentPhaseGameTeamComponent,
    TournamentListComponent,
  ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatOptionModule,
    ReactiveFormsModule,
    ArrayModule,
    DragDropModule,
    TeamSharedModule,
    MatListModule,
  ],
})
export class TournamentModule {}
