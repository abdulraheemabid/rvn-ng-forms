import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomFormControlValueAccessor } from '../../utils/custom-form-control-value-accessor';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { RvnCheckboxInput } from './rvn-checkbox.input';

@Component({
  selector: 'rvn-checkbox',
  templateUrl: './rvn-checkbox.component.html',
  styleUrls: ['./rvn-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RvnCheckboxComponent),
      multi: true
    }
  ]
})
export class RvnCheckboxComponent extends CustomFormControlValueAccessor implements OnInit {

  @Input() config: RvnCheckboxInput = null;
  formGroup: FormGroup = new FormGroup({});
  checkBoxArray: FormArray;


  ngOnInit() {
    if (!this.config.styleVersion) this.config.styleVersion = 'v1';
    this.checkBoxArray = this.initFormArray();
    this.checkBoxArray.valueChanges.subscribe(selectedValues => this.syncControls(selectedValues));
  }

  initFormArray() {
    this.formGroup.addControl("checkboxArray", new FormArray([]));
    let array = this.formGroup.get('checkboxArray') as FormArray;

    if (isNullOrUndefined(this.formControl.value)) {
      this.config?.checkboxOptions.forEach(option => array.push(new FormControl(false)));
    } else {
      this.config?.checkboxOptions.forEach(option => {
        const isValidOption = this.formControl.value.find(v => v.key === option.key && v.value === option.value);
        if (!isNullOrUndefined(isValidOption)) array.push(new FormControl(true));
        else array.push(new FormControl(false));
      })
    }

    return array;
  }

  syncControls(selectedValues: boolean[]) {
    let valuesToSet = [];
    selectedValues.forEach((sv, i) => {
      if (sv) valuesToSet.push(this.config?.checkboxOptions[i])
    });
    this.formControl.setValue(valuesToSet);
  }
}
