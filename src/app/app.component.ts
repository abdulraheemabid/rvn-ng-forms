import { Component, HostBinding, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AppService } from './app.service';
import { RvnStyleService } from './@shared/rvn-core/services/style/style.service';
import { RvnSelectInput } from './@shared/rvn-core/components/rvn-select/rvn-select.input';
import { RvnNavItem } from './@shared/rvn-core/components/rvn-nav-list/rvn-nav-list.input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private overlayContainer: OverlayContainer, private appService: AppService, private styleService: RvnStyleService) { }

  @HostBinding('class') className = '';

  showLoader: BehaviorSubject<boolean>;
  toolBarHeading: string = "";

  sideBarLinks: RvnNavItem[] = [];
  toggleSidenav$ = new BehaviorSubject(null);

  darkClassName = 'app-dark-theme';
  isDarkModeFC: FormControl = new FormControl(false);

  fieldAppearanceOption = [{ key: "legacy", value: "Field apperance: legacy" }, { key: "standard", value: "Field apperance: standard" }, { key: "fill", value: "Field apperance: fill" }, { key: "outline", value: "Field apperance: outline" }];
  fieldAppearanceConfig: RvnSelectInput;
  fieldAppearanceFC = new FormControl("");

  ngOnInit() {
    this.setDefaultTheme("dark");
    this.handleFieldAppearance();
    this.handleThemeChange();
    this.handleSideBarLinks();
    this.handleTopBarHeading();
    this.handleLoader();
  }

  handleFieldAppearance() {
    this.fieldAppearanceConfig = { label: '', styleVersion: 'v2', appearance: 'outline', selectOptions: this.fieldAppearanceOption };

    this.styleService.getFormFieldStyle$.subscribe(val => {
      if (this.fieldAppearanceFC.value === "" || val !== this.fieldAppearanceFC?.value?.key)
        this.fieldAppearanceFC.setValue(this.fieldAppearanceOption.find(o => o.key === val));
    });
    this.fieldAppearanceFC.valueChanges.subscribe(val => this.styleService.setFormFieldStyle(val.key));
  }

  handleThemeChange() {
    this.isDarkModeFC.valueChanges.subscribe((darkMode) => {
      this.className = darkMode ? this.darkClassName : '';
      if (darkMode) {
        this.overlayContainer.getContainerElement().classList.add(this.darkClassName);
      } else {
        this.overlayContainer.getContainerElement().classList.remove(this.darkClassName);
      }
    });
  }

  handleSideBarLinks() {
    const fixedLinks = [{ displayName: "Demo", routeURL: '/demo' }, { displayName: "All Forms", routeURL: '/forms', showDividerBelow: true }];
    this.sideBarLinks = [...fixedLinks];
    // this.sideBarLinks.push({ displayName: "Demo", routeURL: '/demo' });
    // this.sideBarLinks.push({ displayName: "All Forms", routeURL: '/forms', showDividerBelow: true });

    this.appService.formLinks$.subscribe(links => {
      this.sideBarLinks = [...fixedLinks, ...links];
    });
  }

  handleTopBarHeading() {
    this.appService.toolBarHeading.subscribe(value => this.toolBarHeading = value);
  }

  handleLoader() {
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

  toggleSidenav() {
    this.toggleSidenav$.next(null);
  }
}
