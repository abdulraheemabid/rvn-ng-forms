import { KeyValue } from '@angular/common';
import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RvnChipsInputInput } from './rvn-chips-input.input';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CustomFormControlValueAccessor } from '../../utils/custom-form-control-value-accessor';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { RvnStyleService } from '../../services/style/style.service';
import { of } from 'rxjs';

@Component({
  selector: 'rvn-chips-input',
  templateUrl: './rvn-chips-input.component.html',
  styleUrls: ['./rvn-chips-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RvnChipsInputComponent),
      multi: true
    }
  ]
})
export class RvnChipsInputComponent extends CustomFormControlValueAccessor implements OnInit {

  constructor(private _injector: Injector, private styleService: RvnStyleService) {
    super(_injector);
  }

  @Input() params: RvnChipsInputInput;
  selectedOptions: Set<string> = new Set();

  formFieldAppearance: any;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  ngOnInit(): void {
    if (isNullOrUndefined(this.params)) this.params = { label: null };
    if (isNullOrUndefined(this.params.required)) this.params.required = false;
    if (isNullOrUndefined(this.params.requiredErrorMessage)) this.params.requiredErrorMessage = `${this.params.label} is required`;
    if (isNullOrUndefined(this.params.styleVersion)) this.params.styleVersion = 'v1';
    this.formFieldAppearance = isNullOrUndefined(this.params?.appearance) ? this.styleService.getFormFieldStyle$ : of(this.params.appearance);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.selectedOptions.add(value.trim());
      this.syncFormControl();
    }

    if (input) {
      input.value = '';
    }
  }

  remove(option: string): void {
    this.selectedOptions.delete(option);
    this.syncFormControl();
  }

  syncFormControl() {
    this.formControl.markAsTouched();
    this.formControl.markAsDirty();
    let array = [];
    let key = 0;
    this.selectedOptions.forEach(value => {
      array.push({ key, value });
      key++;
    });
    if (array.length == 0) array = null;
    this.formControl.setValue(array);
  }

}
