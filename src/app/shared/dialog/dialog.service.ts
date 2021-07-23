import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { DialogComponent, DialogComponentData } from './dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private matDialog: MatDialog) {}

  confirm({
    btnNo,
    btnYes,
    ...data
  }: Omit<DialogComponentData, 'buttons'> & { btnYes?: string; btnNo?: string }): Observable<boolean> {
    return this.matDialog
      .open<DialogComponent, DialogComponentData, boolean>(DialogComponent, {
        data: {
          ...data,
          buttons: [
            { title: btnNo ?? 'No', action: matDialogRef => matDialogRef.close(false) },
            { title: btnYes ?? 'Yes', action: matDialogRef => matDialogRef.close(true) },
          ],
        },
      })
      .afterClosed()
      .pipe(map(result => !!result));
  }

  open<R = any>(data: DialogComponentData): MatDialogRef<DialogComponent, R> {
    return this.matDialog.open<DialogComponent, DialogComponentData, R>(DialogComponent, { data });
  }
}
