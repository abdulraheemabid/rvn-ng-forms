import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class RvnCheckboxComponent implements OnInit {

  @Input() params: RvnCheckboxInput = null;
  @Input() formGroup: FormGroup;
  checkBoxArray: FormArray;


  ngOnInit() {
    if (!this.params.styleVersion) this.params.styleVersion = 'v1';
    this.checkBoxArray = this.getFormArray();
  }

  getFormArray(): FormArray {
    let array = this.formGroup.get('checkboxArray') as FormArray;
    if (!array) {
      this.formGroup.addControl("checkboxArray", new FormArray([]));
      array = this.formGroup.get('checkboxArray') as FormArray;
    }
    this.params?.checkboxOptions.forEach(option => array.push(new FormControl(false)))
    return array;
  }

}
