import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { RvnConfirmDialogInput } from './rvn-confirm-dialog.input';

@Component({
  selector: 'rvn-confirm-dialog',
  templateUrl: './rvn-confirm-dialog.component.html',
  styleUrls: ['./rvn-confirm-dialog.component.scss']
})
export class RvnConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: RvnConfirmDialogInput) { }
  params: RvnConfirmDialogInput;
  ngOnInit() {
    this.params = this.data;
    if (isNullOrUndefined(this.params)) this.params = {};
    if (isNullOrUndefined(this.params.title)) this.params.title = "";
    if (isNullOrUndefined(this.params.message)) this.params.message = "Are you sure?";
    if (isNullOrUndefined(this.params.yesButtonMessage)) this.params.yesButtonMessage = "Yes";
    if (isNullOrUndefined(this.params.noButtonMessage)) this.params.noButtonMessage = "No";
    if (isNullOrUndefined(this.params.yesButtonParams)) this.params.yesButtonParams = { type: 'tertiary' };
    if (isNullOrUndefined(this.params.noButtonParams)) this.params.noButtonParams = { type: 'tertiary' };
  }
}
