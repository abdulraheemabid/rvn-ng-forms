import { Injectable, ViewContainerRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isNullOrUndefined } from '../../utils/funtions.util';

@Injectable({
  providedIn: 'root'
})
export class RvnSnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  showSnackBar(input: SnackBarInput) {

    if (isNullOrUndefined(input)) input = { message: "Alert" };
    if (isNullOrUndefined(input.horizontalPosition)) input.horizontalPosition = "right";
    if (isNullOrUndefined(input.verticalPosition)) input.verticalPosition = "top";
    if (typeof input.duration === "undefined") input.duration = 2500;

    return this._snackBar.open(input.message, input.actionMessage, input);
  }

  showSuccessAlert(message: string) {
    this.showSnackBar({ message });
  }

  showErrorAlert(message: string) {
    this.showSnackBar({ message, panelClass: ['warn-bg', 'color-white', 'text-bold'] });
  }


}

export interface SnackBarInput {
  message: string;
  actionMessage?: string;
  horizontalPosition?: SnackBarHorizontalPosition;
  verticalPosition?: SnackBarVerticalPosition;
  panelClass?: string | string[];
  duration?: number;
  viewContainerRef?: ViewContainerRef;
}


export type SnackBarHorizontalPosition = "start" | "center" | "end" | "left" | "right";
export type SnackBarVerticalPosition = "bottom" | "top";
