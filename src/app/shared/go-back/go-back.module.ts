import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from './go-back.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [GoBackComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  exports: [GoBackComponent],
})
export class GoBackModule {}
