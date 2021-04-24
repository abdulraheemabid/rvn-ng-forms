import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { CustomFormControlValueAccessor } from 'src/app/@shared/utils/custom-form-control-value-accessor';
import { isNullOrUndefined } from '../../utils/funtions.util';

import { RvnSelectInput } from './rvn-select.input';

@Component({
  selector: 'rvn-select',
  templateUrl: './rvn-select.component.html',
  styleUrls: ['./rvn-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RvnSelectComponent),
      multi: true
    }
  ]
})
export class RvnSelectComponent extends CustomFormControlValueAccessor implements OnInit {

  @Input() params: RvnSelectInput = null;

  ngOnInit() {
    if (isNullOrUndefined(this.params.required)) this.params.required = false;
    if (isNullOrUndefined(this.params.requiredErrorMessage)) this.params.requiredErrorMessage = `${this.params.label} is required`;
    if (isNullOrUndefined(this.params.styleVersion)) this.params.styleVersion = 'v1';
  }
}
