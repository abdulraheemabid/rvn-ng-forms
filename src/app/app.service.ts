import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common'
import { RvnNavItem } from '@abdulraheemabid/rvn-pkg-ng-core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private router: Router, private location: Location) { }

  /**
   * This property is set by the interceptor and based on that we show/hide the loader.
   */
  showLoader: BehaviorSubject<boolean> = new BehaviorSubject(false);
  /**
   * As we need to show form links in the sidebar which can be added/deleted dynamically.
   * This property is exposed so that the relavant component can manage this too.
   */
  formLinks$: BehaviorSubject<RvnNavItem[]> = new BehaviorSubject([]);

  toolBarHeading = new BehaviorSubject<string>("");

  /**
   * All screens set the main heading of the page according to their needs, 
   * by calling this function
   */
  setToolBarHeading(val: string) {
    setTimeout(() => this.toolBarHeading.next(val));
  }

  /**
   * All screens should only use this method to navigate and not use router directly.
   */
  navigate(path: string, params?: unknown) {
    this.router.navigateByUrl(path, params);
  }

  navigateBack() {
    this.location.back();
  }
}