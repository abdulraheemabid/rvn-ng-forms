import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RvnInputInput } from './@shared/base-components/form-controls/rvn-input/rvn-input.input';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RvnSelectInput } from './@shared/base-components/form-controls/rvn-select/rvn-select.input';
import { RvnRadioInput } from './@shared/base-components/form-controls/rvn-radio/rvn-radio.input';
import { RvnToggleInput } from './@shared/base-components/form-controls/rvn-toggle/rvn-toggle.input';
import { RvnCheckboxInput } from './@shared/base-components/form-controls/rvn-checkbox/rvn-checkbox.input';

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

  title = 'rvn-ng-forms';

  fc = new FormControl(null, [Validators.required]);

  JSON = JSON;

  textFieldInput: RvnInputInput = {
    label: 'name',
    placeholder: 'full name',
    type: 'text',
    required: true,
    requiredErrorMessage: 'name is required',
  }

  textFieldInput2: RvnInputInput = {
    label: 'age',
    placeholder: '1-10',
    type: 'number',
    required: true,
    requiredErrorMessage: 'age is required',
    styleVersion: 'v2'
  }

  selectInput: RvnSelectInput = {
    label: 'type',
    placeholder: 'type',
    required: true,
    requiredErrorMessage: 'type is required',
    styleVersion: 'v2',
    selectOptions: [{ key: "1", value: "type 1" }, { key: "2", value: "type 2" }, { key: "3", value: "type 3" }]
  }

  selectInput2: RvnSelectInput = {
    ...this.selectInput,
    styleVersion: 'v1'
  }

  radioInput: RvnRadioInput = {
    label: 'gender',
    required: true,
    requiredErrorMessage: 'gender is required',
    styleVersion: 'v1',
    radioOptions: [{ key: "1", value: "Male" }, { key: "2", value: "Female" }, { key: "3", value: "Fale" }, { key: "4", value: "Memale" }]
  }

  toggleInput: RvnToggleInput = {
    label: 'Are you crazy?',
    required: true,
    requiredErrorMessage: 'required',
    styleVersion: 'v1',
  }

  checkboxInput: RvnCheckboxInput = {
    label: 'preference',
    styleVersion: 'v1',
    checkboxOptions: [{ key: "1", value: "Male" }, { key: "2", value: "Female" }, { key: "3", value: "Fale" }, { key: "4", value: "Memale" }]
  }

  checkboxFG = new FormGroup({});

  onClick(){
    alert('clicked');
  }

  ngOnInit() {
      
  }
}
