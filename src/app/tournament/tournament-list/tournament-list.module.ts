import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentListRoutingModule } from './tournament-list-routing.module';
import { TournamentListComponent } from './tournament-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { GoBackModule } from '../../shared/go-back/go-back.module';

@NgModule({
  declarations: [TournamentListComponent],
  imports: [
    CommonModule,
    TournamentListRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    MatButtonModule,
    GoBackModule,
  ],
})
export class TournamentListModule {}
