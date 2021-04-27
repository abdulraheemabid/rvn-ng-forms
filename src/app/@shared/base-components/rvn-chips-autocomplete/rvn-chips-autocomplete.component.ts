import { Component, ElementRef, forwardRef, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CustomFormControlValueAccessor } from '../../utils/custom-form-control-value-accessor';
import { RvnChipsAutocompleteInput } from './rvn-chips-autocomplete.input';
import { KeyValue } from '@angular/common';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { RvnStyleService } from '../../services/style.service';

@Component({
  selector: 'rvn-chips-autocomplete',
  templateUrl: './rvn-chips-autocomplete.component.html',
  styleUrls: ['./rvn-chips-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RvnChipsAutocompleteComponent),
      multi: true
    }
  ]
})
export class RvnChipsAutocompleteComponent extends CustomFormControlValueAccessor implements OnInit {
  @Input() params: RvnChipsAutocompleteInput;
  inputFormControl: FormControl;
  filteredOptions: Observable<KeyValue<any, any>[]>;
  selectedOptions: Set<KeyValue<any, any>> = new Set();
  allOptions: KeyValue<any, any>[];
  formFieldAppearance: any;

  constructor(private _injector: Injector, private styleService: RvnStyleService) {
    super(_injector);
  }

  @ViewChild('inputElement') inputElement: ElementRef<HTMLInputElement>;

  ngOnInit() {
    if (isNullOrUndefined(this.params)) this.params = { label: null, autoCompleteOption: null };
    if (isNullOrUndefined(this.params.required)) this.params.required = false;
    if (isNullOrUndefined(this.params.requiredErrorMessage)) this.params.requiredErrorMessage = `${this.params.label} is required`;
    if (isNullOrUndefined(this.params.styleVersion)) this.params.styleVersion = 'v1';

    this.formFieldAppearance = isNullOrUndefined(this.params?.appearance) ? this.styleService.getFormFieldStyle$ : of(this.params.appearance);

    this.allOptions = [...this.params.autoCompleteOption];

    let opts = [];
    if (this.params.required) opts.push(Validators.required);
    this.inputFormControl = new FormControl('', opts);

    //On key enter, filter the autocomple list with given key
    this.filteredOptions = this.inputFormControl.valueChanges.pipe(
      map((enteredKey: string | null) => enteredKey ? this._filter(enteredKey) : this.allOptions.slice()));
  }

  remove(option: KeyValue<any, any>): void {
    this.selectedOptions.delete(option);
    this.syncFormControl();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedOptions.add(event.option.value);
    this.inputElement.nativeElement.value = '';
    this.inputFormControl.setValue(null);
    this.syncFormControl();
  }

  private _filter(value: string | KeyValue<any, any>): KeyValue<any, any>[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value.value.toLowerCase();
    return this.allOptions.filter(option => option.value.toLowerCase().indexOf(filterValue) === 0);
  }

  syncFormControl() {
    this.formControl.setValue([...this.selectedOptions]);
  }

}
