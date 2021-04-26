import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  toolBarHeading = new BehaviorSubject<string>("");

  setToolBarHeading(val: string) {
    setTimeout(() => this.toolBarHeading.next(val));
  }
}
