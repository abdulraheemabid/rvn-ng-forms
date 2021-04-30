import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private router: Router) { }

  showLoader: BehaviorSubject<boolean> = new BehaviorSubject(false);

  toolBarHeading = new BehaviorSubject<string>("");

  setToolBarHeading(val: string) {
    setTimeout(() => this.toolBarHeading.next(val));
  }

  navigate(path: string, params?: any) {
    this.router.navigateByUrl(path, params);
  }
}
