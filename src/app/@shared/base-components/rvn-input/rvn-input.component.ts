import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { of } from 'rxjs';
import { CustomFormControlValueAccessor } from 'src/app/@shared/utils/custom-form-control-value-accessor';
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


  @Input() params: RvnInputInput = null;
  formFieldAppearance: any;

  ngOnInit() {
    if (isNullOrUndefined(this.params)) this.params = { label: null };
    if (isNullOrUndefined(this.params.type)) this.params.type = "text";
    if (isNullOrUndefined(this.params.required)) this.params.required = false;
    if (isNullOrUndefined(this.params.requiredErrorMessage)) this.params.requiredErrorMessage = `${this.params.label} is required`;
    if (isNullOrUndefined(this.params.styleVersion)) this.params.styleVersion = 'v1';
    this.formFieldAppearance = isNullOrUndefined(this.params?.appearance) ? this.styleService.getFormFieldStyle$ : of(this.params.appearance);
  }

}
