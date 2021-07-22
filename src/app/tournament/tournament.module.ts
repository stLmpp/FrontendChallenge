import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentComponent } from './tournament.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [TournamentComponent],
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
  ],
})
export class TournamentModule {}
