import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamCrudComponent } from './team-crud/team-crud.component';
import { TeamAddComponent } from './team-add/team-add.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TeamComponent } from './team/team.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [TeamCrudComponent, TeamAddComponent, TeamEditComponent, TeamComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class TeamModule {}
