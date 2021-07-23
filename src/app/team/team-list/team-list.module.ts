import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamListRoutingModule } from './team-list-routing.module';
import { TeamListComponent } from './team-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { GoBackModule } from '../../shared/go-back/go-back.module';

@NgModule({
  declarations: [TeamListComponent],
  imports: [
    CommonModule,
    TeamListRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    GoBackModule,
  ],
})
export class TeamListModule {}
