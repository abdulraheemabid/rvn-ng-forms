import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CustomControlValueAccessor } from '../../utils/custom-control-value-accessor';
import { RvnToggleInput } from './rvn-toggle.input';

@Component({
  selector: 'rvn-toggle',
  templateUrl: './rvn-toggle.component.html',
  styleUrls: ['./rvn-toggle.component.scss'],
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RvnToggleComponent),
      multi: true
    }
  ]
})
export class RvnToggleComponent extends CustomControlValueAccessor implements OnInit {

  @Input() params: RvnToggleInput = null;

  ngOnInit() {
    if (!this.params?.required) this.params.required = false;
    if (!this.params?.requiredErrorMessage) this.params.requiredErrorMessage = `${this.params.label} is required`;
    if (!this.params?.styleVersion) this.params.styleVersion = 'v1';
  }

}
