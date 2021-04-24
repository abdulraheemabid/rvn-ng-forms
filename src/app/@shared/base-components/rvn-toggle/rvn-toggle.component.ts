import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomFormControlValueAccessor } from 'src/app/@shared/utils/custom-form-control-value-accessor';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { RvnToggleInput } from './rvn-toggle.input';

@Component({
  selector: 'rvn-toggle',
  templateUrl: './rvn-toggle.component.html',
  styleUrls: ['./rvn-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RvnToggleComponent),
      multi: true
    }
  ]
})
export class RvnToggleComponent extends CustomFormControlValueAccessor implements OnInit {

  @Input() params: RvnToggleInput = null;

  ngOnInit() {
    if (isNullOrUndefined(this.params?.required)) this.params.required = false;
    if (isNullOrUndefined(this.params?.requiredErrorMessage)) this.params.requiredErrorMessage = `${this.params.label} is required`;
    if (isNullOrUndefined(this.params?.styleVersion)) this.params.styleVersion = 'v1';
  }

}
