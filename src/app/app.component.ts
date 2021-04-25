import { Component, HostBinding, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver, private overlayContainer: OverlayContainer, private appService: AppService) { }

  @HostBinding('class') className = '';
  darkClassName = 'app-dark-theme';
  toolBarHeading: string = "";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isDarkModeFC = new FormControl(false);

  ngOnInit() {

    this.isDarkModeFC.valueChanges.subscribe((darkMode) => {
      this.className = darkMode ? this.darkClassName : '';
      if (darkMode) {
        this.overlayContainer.getContainerElement().classList.add(this.darkClassName);
      } else {
        this.overlayContainer.getContainerElement().classList.remove(this.darkClassName);
      }
    });

    this.appService.toolBarHeading.subscribe(value => this.toolBarHeading = value);

  }
}
