import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamCrudComponent } from './team-crud/team-crud.component';
import { TeamAddComponent } from './team-add/team-add.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TeamComponent } from './team.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TeamListComponent } from './team-list/team-list.component';
import { MatListModule } from '@angular/material/list';
import { DialogModule } from '../dialog/dialog.module';

@NgModule({
  declarations: [TeamCrudComponent, TeamAddComponent, TeamEditComponent, TeamComponent, TeamListComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    DialogModule,
  ],
})
export class TeamModule {}
