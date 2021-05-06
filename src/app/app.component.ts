import { Component, HostBinding, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppService } from './app.service';
import { RvnStyleService } from './@shared/rvn-core/services/style/style.service';
import { RvnSelectInput } from './@shared/rvn-core/components/rvn-select/rvn-select.input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver, private overlayContainer: OverlayContainer, private appService: AppService, private styleService: RvnStyleService) { }

  @HostBinding('class') className = '';
  darkClassName = 'app-dark-theme';
  toolBarHeading: string = "";
  showLoader: BehaviorSubject<boolean>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isDarkModeFC: FormControl = new FormControl(false);
  fieldAppearanceOption = [{ key: "legacy", value: "Field apperance: legacy" }, { key: "standard", value: "Field apperance: standard" }, { key: "fill", value: "Field apperance: fill" }, { key: "outline", value: "Field apperance: outline" }];
  fieldAppearanceConfig: RvnSelectInput;
  fieldAppearanceFC = new FormControl("");

  ngOnInit() {

    this.setDefaultTheme("dark");

    this.fieldAppearanceConfig = { label: '', styleVersion: 'v2', appearance: 'outline', selectOptions: this.fieldAppearanceOption };

    this.styleService.getFormFieldStyle$.subscribe(val => {
      if (this.fieldAppearanceFC.value === "" || val !== this.fieldAppearanceFC?.value?.key)
        this.fieldAppearanceFC.setValue(this.fieldAppearanceOption.find(o => o.key === val));
    });
    this.fieldAppearanceFC.valueChanges.subscribe(val => this.styleService.setFormFieldStyle(val.key));

    this.isDarkModeFC.valueChanges.subscribe((darkMode) => {
      this.className = darkMode ? this.darkClassName : '';
      if (darkMode) {
        this.overlayContainer.getContainerElement().classList.add(this.darkClassName);
      } else {
        this.overlayContainer.getContainerElement().classList.remove(this.darkClassName);
      }
    });

    this.appService.toolBarHeading.subscribe(value => this.toolBarHeading = value);

    this.showLoader = this.appService.showLoader;

  }

  setDefaultTheme(theme: 'light' | 'dark') {
    if (theme === 'dark') {
      this.className = "app-dark-theme";
      this.overlayContainer.getContainerElement().classList.add(this.darkClassName);
      this.isDarkModeFC.setValue(true);
    }

    if (theme === 'light') {
      this.className = "";
      this.overlayContainer.getContainerElement().classList.remove(this.darkClassName);
      this.isDarkModeFC.setValue(false);
    }
  }
}
