import { ChangeDetectionStrategy, Component, Inject, TrackByFunction } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';

export interface DialogComponentDataButton {
  title: string;
  color?: ThemePalette;
  action?(matDialogRef: MatDialogRef<DialogComponentData, boolean>): any;
}

export interface DialogComponentData {
  title: string;
  content?: string;
  buttons?: DialogComponentDataButton[];
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogComponentData,
    private matDialogRef: MatDialogRef<DialogComponentData, boolean>
  ) {}

  trackByButton: TrackByFunction<DialogComponentDataButton> = index => index;

  onButtonClick(button: DialogComponentDataButton): void {
    if (!button.action) {
      return;
    }
    button.action(this.matDialogRef);
  }
}
