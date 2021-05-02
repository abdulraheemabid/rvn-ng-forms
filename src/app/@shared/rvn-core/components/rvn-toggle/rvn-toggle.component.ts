import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomFormControlValueAccessor } from 'src/app/@shared/rvn-core/utils/custom-form-control-value-accessor';
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

  @Input() config: RvnToggleInput = null;

  ngOnInit() {
    if (isNullOrUndefined(this.config)) this.config = {} as RvnToggleInput;
    if (isNullOrUndefined(this.config?.required)) this.config.required = false;
    if (isNullOrUndefined(this.config?.requiredErrorMessage)) this.config.requiredErrorMessage = `${this.config.label} is required`;
    if (isNullOrUndefined(this.config?.styleVersion)) this.config.styleVersion = 'v1';
  }

}
