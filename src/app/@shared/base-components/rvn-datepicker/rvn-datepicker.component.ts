import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomFormControlValueAccessor } from '../../utils/custom-form-control-value-accessor';
import { RvnDatepickerInput } from './rvn-datepicker.input';

@Component({
  selector: 'rvn-datepicker',
  templateUrl: './rvn-datepicker.component.html',
  styleUrls: ['./rvn-datepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RvnDatepickerComponent),
      multi: true
    }
  ]
})
export class RvnDatepickerComponent extends CustomFormControlValueAccessor implements OnInit {

  @Input() params: RvnDatepickerInput = null;

  ngOnInit() {
    if (!this.params.required) this.params.required = false;
    if (!this.params.requiredErrorMessage) this.params.requiredErrorMessage = `${this.params.label} is required`;
    if (!this.params.styleVersion) this.params.styleVersion = 'v1';
  }

}
