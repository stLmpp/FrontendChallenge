import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from './dialog.service';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [MatDialogModule, MatButtonModule],
})
export class DialogModule {
  static forRoot(): ModuleWithProviders<DialogModule> {
    return {
      ngModule: DialogModule,
      providers: [DialogService],
    };
  }
}
