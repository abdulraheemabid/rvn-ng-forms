import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { RvnCheckboxInput } from "src/app/@shared/rvn-core/components/rvn-checkbox/rvn-checkbox.input";
import { RvnChipsAutocompleteInput } from "src/app/@shared/rvn-core/components/rvn-chips-autocomplete/rvn-chips-autocomplete.input";
import { RvnDatepickerInput } from "src/app/@shared/rvn-core/components/rvn-datepicker/rvn-datepicker.input";
import { RvnInputInput } from "src/app/@shared/rvn-core/components/rvn-input/rvn-input.input";
import { RvnRadioInput } from "src/app/@shared/rvn-core/components/rvn-radio/rvn-radio.input";
import { RvnSelectInput } from "src/app/@shared/rvn-core/components/rvn-select/rvn-select.input";
import { RvnTableInput } from "src/app/@shared/rvn-core/components/rvn-table/rvn-table.input";
import { RvnToggleInput } from "src/app/@shared/rvn-core/components/rvn-toggle/rvn-toggle.input";
import { RvnSnackBarService, SnackBarInput } from "src/app/@shared/rvn-core/services/rvn-snack-bar/rvn-snack-bar.service";
import { AppService } from "src/app/app.service";


@Component({
  selector: 'demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  constructor(private appService: AppService, private snackBarService: RvnSnackBarService) { }

  @ViewChild("mainContainer") mainContainer;
  @ViewChild("onRowExpand", { static: true }) onRowExpand;
  @ViewChild("actions", { static: true }) actions;


  ngOnInit() {
    this.appService.setToolBarHeading("Demo");
    //temp
    setTimeout(() => this.mainContainer.nativeElement.lastElementChild.scrollIntoView({ behavior: "smooth", block: "end" }));


    this.tableParams = {
      data: [{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', description: "Hydrogen is a chemical element with symbol H and atomic number 1. With a standard" }, { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', description: "Helium is a chemical element with symbol He and atomic number 2. " }, { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', description: "Lithium is a chemical element with symbol Li and atomic number 3. It is a soft" }, { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', description: "Beryllium is a chemical element with symbol Be and atomic number 4. " }, { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', description: "Boron is a chemical element with symbol B and atomic number 5. Produced entire" }, { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', description: "Carbon is a chemical element with symbol C and atomic number 6. It is nonmeta" }, { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', description: "Nitrogen is a chemical element with symbol N and atomic number 7. I" }, { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', description: "Oxygen is a chemical element with symbol O and atomic number 8. It is a me" }, { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', description: "Fluorine is a chemical element with symbol F and atomic number 9. It i" }, { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', description: "Neon is a chemical element with symbol Ne and atomic number 10. It is a n" },],
      //data: [],
      columnsToDisplay: [{ keyName: 'name' }, { keyName: 'weight' }, { keyName: 'symbol' }, { keyName: 'position' }, { keyName: 'action', customTemplate: this.actions, textAlign: 'right' }],
      enableFilter: true,
      stickColumnsAtStartIndexes: [],
      stickColumnsAtEndIndexes: [],
      noDataMessage: "No data found. and this is a custom message",
      noDataOnFilterMessage: "No data found matching filter. and this is a custom message",
      templateToShowOnRowExpand: this.onRowExpand,
      enablePagination: true,
      pageOptions: [5, 10, 100]
    }
  }

  fc = new FormControl(null, [Validators.required]);

  tableParams: RvnTableInput;

  textFieldInput: RvnInputInput = {
    label: 'name',
    placeholder: 'full name',
    type: 'text',
    required: true,
    requiredErrorMessage: 'name is required',
    suffixIcon: 'search'
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
    radioOptions: [{ key: "1", value: "Male" }, { key: "2", value: "Female" }, { key: "3", value: "Fale" }]
  }

  toggleInput: RvnToggleInput = {
    label: 'Are you crazy?',
    required: true,
    requiredErrorMessage: 'required',
    styleVersion: 'v1',
  }

  checkboxInput: RvnCheckboxInput = {
    label: 'gender',
    styleVersion: 'v1',
    checkboxOptions: [{ key: "1", value: "Male" }, { key: "2", value: "Female" }, { key: "3", value: "Fale" }]
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

  dateInput2: RvnDatepickerInput = {
    label: 'Date',
    placeholder: 'Select a date',
    required: true,
    requiredErrorMessage: 'date is required',
    styleVersion: 'v1',
  }

  dateFC = new FormControl(null, [Validators.required]);



  openSnackBar(input: SnackBarInput) {
    return this.snackBarService.showSnackBar(input);
  }

  onClick(listItem = null) {
    if (listItem)
      alert(JSON.stringify(listItem));
    else
      alert('clicked');
  }

}
