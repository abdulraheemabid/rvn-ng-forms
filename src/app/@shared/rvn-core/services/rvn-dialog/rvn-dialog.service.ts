import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RvnConfirmDialogComponent } from '../../components/rvn-confirm-dialog/rvn-confirm-dialog.component';
import { RvnConfirmDialogInput } from '../../components/rvn-confirm-dialog/rvn-confirm-dialog.input';

@Injectable({
  providedIn: 'root'
})
export class RvnDialogService {

  constructor(public dialog: MatDialog) { }

  openConfirmDialog(params: RvnConfirmDialogInput = {}): Observable<boolean> {
    const dialogRef = this.dialog.open(RvnConfirmDialogComponent, { data: params });
    return dialogRef.afterClosed();
  }
}
