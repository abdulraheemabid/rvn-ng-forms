import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { of } from 'rxjs';
import { CustomFormControlValueAccessor } from 'src/app/@shared/rvn-core/utils/custom-form-control-value-accessor';
import { RvnStyleService } from '../../services/style/style.service';
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

  constructor(private _injector: Injector, private styleService: RvnStyleService) {
    super(_injector);
  }


  @Input() config: RvnInputInput = null;
  formFieldAppearance: any;

  ngOnInit() {
    if (isNullOrUndefined(this.config)) this.config = { label: null };
    if (isNullOrUndefined(this.config.type)) this.config.type = "text";
    if (isNullOrUndefined(this.config.required)) this.config.required = false;
    if (isNullOrUndefined(this.config.requiredErrorMessage)) this.config.requiredErrorMessage = `${this.config.label} is required`;
    if (isNullOrUndefined(this.config.styleVersion)) this.config.styleVersion = 'v1';
    this.formFieldAppearance = isNullOrUndefined(this.config?.appearance) ? this.styleService.getFormFieldStyle$ : of(this.config.appearance);
  }

}
