import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomFormControlValueAccessor } from 'src/app/@shared/utils/custom-form-control-value-accessor';
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
  
  @Input() params: RvnRadioInput = null;

  ngOnInit() {
    if (!this.params.required) this.params.required = false;
    if (!this.params.requiredErrorMessage) this.params.requiredErrorMessage = `${this.params.label} is required`;
    if (!this.params.styleVersion) this.params.styleVersion = 'v1';
  }
}
