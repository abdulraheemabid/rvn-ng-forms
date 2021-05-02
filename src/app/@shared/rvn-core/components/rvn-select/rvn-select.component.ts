import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { CustomFormControlValueAccessor } from 'src/app/@shared/rvn-core/utils/custom-form-control-value-accessor';
import { RvnStyleService } from '../../services/style/style.service';
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

  constructor(private _injector: Injector, private styleService: RvnStyleService) {
    super(_injector);
  }

  @Input() config: RvnSelectInput = null;
  formFieldAppearance: any;

  ngOnInit() {
    if (isNullOrUndefined(this.config)) this.config = { label: null, selectOptions: null };
    if (isNullOrUndefined(this.config.required)) this.config.required = false;
    if (isNullOrUndefined(this.config.requiredErrorMessage)) this.config.requiredErrorMessage = `${this.config.label} is required`;
    if (isNullOrUndefined(this.config.styleVersion)) this.config.styleVersion = 'v1';
    this.formFieldAppearance = isNullOrUndefined(this.config?.appearance) ? this.styleService.getFormFieldStyle$ : of(this.config.appearance);
    this.initValueIfAlreadyExists();
  }

  initValueIfAlreadyExists() {
    if (!isNullOrUndefined(this.formControl.value)) {
      const selectedOption = this.config.selectOptions.find(o => o.key === this.formControl.value.key);
      this.formControl.setValue(selectedOption, { emitEvent: false });
    }
  }
}
