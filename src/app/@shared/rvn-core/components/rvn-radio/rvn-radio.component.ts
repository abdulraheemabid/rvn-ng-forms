import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomFormControlValueAccessor } from 'src/app/@shared/rvn-core/utils/custom-form-control-value-accessor';
import { isKeyValue, isNullOrUndefined } from '../../utils/funtions.util';
import { RvnRadioInput } from './rvn-radio.input';

@Component({
  selector: 'rvn-radio',
  templateUrl: './rvn-radio.component.html',
  styleUrls: ['./rvn-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RvnRadioComponent),
      multi: true
    }
  ]
})
export class RvnRadioComponent extends CustomFormControlValueAccessor implements OnInit {

  @Input() config: RvnRadioInput = null;

  ngOnInit() {
    if (isNullOrUndefined(this.config.required)) this.config.required = false;
    if (isNullOrUndefined(this.config.requiredErrorMessage)) this.config.requiredErrorMessage = `${this.config.label} is required`;
    if (isNullOrUndefined(this.config.styleVersion)) this.config.styleVersion = 'v1';
    this.initValueIfAlreadyExists();
  }

  initValueIfAlreadyExists() {
    if (!isNullOrUndefined(this.formControl.value)) {
      if (!isKeyValue(this.formControl.value)) this.formControl.setValue({ key: this.formControl.value, value: this.formControl.value }, { emitEvent: false });
      const selectedOption = this.config.radioOptions.find(o => o.key === this.formControl.value.key);
      this.formControl.setValue(selectedOption, { emitEvent: false });
    }
  }
}
