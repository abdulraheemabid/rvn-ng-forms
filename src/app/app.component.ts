import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RvnInputInput } from './@shared/base-components/rvn-input/rvn-input.input';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RvnSelectInput } from './@shared/base-components/rvn-select/rvn-select.input';
import { RvnRadioInput } from './@shared/base-components/rvn-radio/rvn-radio.input';
import { RvnToggleInput } from './@shared/base-components/rvn-toggle/rvn-toggle.input';
import { RvnCheckboxInput } from './@shared/base-components/rvn-checkbox/rvn-checkbox.input';
import { RvnChipsAutocompleteInput } from './@shared/base-components/rvn-chips-autocomplete/rvn-chips-autocomplete.input';
import { RvnDatepickerInput } from './@shared/base-components/rvn-datepicker/rvn-datepicker.input';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private breakpointObserver: BreakpointObserver) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    
  ngOnInit() {
      
  }
}
