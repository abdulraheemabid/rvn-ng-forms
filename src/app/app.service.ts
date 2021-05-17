import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '@angular/common'
import { IForm } from './@shared/rvn-forms/types';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private router: Router, private location: Location) { }

  showLoader: BehaviorSubject<boolean> = new BehaviorSubject(false);
  formLinks$: BehaviorSubject<FormSideBarLink[]> = new BehaviorSubject([]);

  toolBarHeading = new BehaviorSubject<string>("");

  setToolBarHeading(val: string) {
    setTimeout(() => this.toolBarHeading.next(val));
  }

  navigate(path: string, params?: any) {
    this.router.navigateByUrl(path, params);
  }

  navigateBack() {
    this.location.back();
  }
}

export interface FormSideBarLink {
  form?: IForm;
  displayName: string;
  navigateToRoute: string;
  showDivider?: boolean;
}
