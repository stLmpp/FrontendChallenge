import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMiniCardComponent } from './team-mini-card/team-mini-card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TeamCrudComponent } from './team-crud/team-crud.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

const DECLARATIONS = [TeamMiniCardComponent, TeamCrudComponent];
const MODULES = [
  CommonModule,
  MatTooltipModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
];

@NgModule({
  imports: [...MODULES],
  declarations: [...DECLARATIONS],
  exports: [...MODULES, ...DECLARATIONS],
})
export class TeamSharedModule {}
