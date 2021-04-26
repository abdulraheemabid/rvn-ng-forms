import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomFormControlValueAccessor } from 'src/app/@shared/utils/custom-form-control-value-accessor';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { RvnInputInput } from './rvn-input.input';

@Component({
  selector: 'rvn-input',
  templateUrl: './rvn-input.component.html',
  styleUrls: ['./rvn-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RvnInputComponent),
      multi: true
    }
  ]
})
export class RvnInputComponent extends CustomFormControlValueAccessor implements OnInit {

  @Input() params: RvnInputInput = null;

  ngOnInit() {
    if (isNullOrUndefined(this.params.type)) this.params.type = "text";
    if (isNullOrUndefined(this.params.required)) this.params.required = false;
    if (isNullOrUndefined(this.params.requiredErrorMessage)) this.params.requiredErrorMessage = `${this.params.label} is required`;
    if (isNullOrUndefined(this.params.styleVersion)) this.params.styleVersion = 'v1';
  }

}
