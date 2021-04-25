import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RvnCheckboxInput } from 'src/app/@shared/base-components/rvn-checkbox/rvn-checkbox.input';
import { RvnChipsAutocompleteInput } from 'src/app/@shared/base-components/rvn-chips-autocomplete/rvn-chips-autocomplete.input';
import { RvnDatepickerInput } from 'src/app/@shared/base-components/rvn-datepicker/rvn-datepicker.input';
import { RvnInputInput } from 'src/app/@shared/base-components/rvn-input/rvn-input.input';
import { RvnRadioInput } from 'src/app/@shared/base-components/rvn-radio/rvn-radio.input';
import { RvnSelectInput } from 'src/app/@shared/base-components/rvn-select/rvn-select.input';
import { RvnToggleInput } from 'src/app/@shared/base-components/rvn-toggle/rvn-toggle.input';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.setToolBarHeading("Demo");
  }

  fc = new FormControl(null, [Validators.required]);

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

  chipInput: RvnChipsAutocompleteInput = {
    label: 'chips',
    placeholder: 'chips autocomplete',
    required: true,
    requiredErrorMessage: 'chips is required',
    styleVersion: 'v1',
    autoCompleteOption: [{ key: "1", value: "type 1" }, { key: "2", value: "type 2" }, { key: "3", value: "type 3" }]
  }

  chipInput2: RvnChipsAutocompleteInput = {
    label: 'chips',
    placeholder: 'chips autocomplete',
    required: true,
    requiredErrorMessage: 'chips is required',
    styleVersion: 'v2',
    autoCompleteOption: [{ key: "1", value: "type 1" }, { key: "2", value: "type 2" }, { key: "3", value: "type 3" }]
  }

  chipInput3: RvnChipsAutocompleteInput = {
    label: 'chips',
    placeholder: 'chips input',
    required: true,
    requiredErrorMessage: 'chips is required',
    styleVersion: 'v2',
    autoCompleteOption: [{ key: "1", value: "type 1" }, { key: "2", value: "type 2" }, { key: "3", value: "type 3" }]
  }

  chipsFC = new FormControl(null, [Validators.required]);

  checkboxFG = new FormGroup({});

  dateInput: RvnDatepickerInput = {
    label: 'Date',
    placeholder: 'Select a date',
    required: true,
    requiredErrorMessage: 'date is required',
    styleVersion: 'v2',
  }

  dateFC = new FormControl(null, [Validators.required]);

  onClick() {
    alert('clicked');
  }

}
