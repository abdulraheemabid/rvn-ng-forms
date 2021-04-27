import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { CustomFormControlValueAccessor } from 'src/app/@shared/utils/custom-form-control-value-accessor';
import { RvnStyleService } from '../../services/style.service';
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

  @Input() params: RvnSelectInput = null;
  formFieldAppearance: any;

  ngOnInit() {
    if (isNullOrUndefined(this.params)) this.params = { label: null, selectOptions: null };
    if (isNullOrUndefined(this.params.required)) this.params.required = false;
    if (isNullOrUndefined(this.params.requiredErrorMessage)) this.params.requiredErrorMessage = `${this.params.label} is required`;
    if (isNullOrUndefined(this.params.styleVersion)) this.params.styleVersion = 'v1';
    this.formFieldAppearance = isNullOrUndefined(this.params?.appearance) ? this.styleService.getFormFieldStyle$ : of(this.params.appearance);
  }
}
