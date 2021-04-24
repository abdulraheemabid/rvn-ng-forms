import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'base-definition-renderer',
  templateUrl: './base-definition-renderer.component.html',
  styleUrls: ['./base-definition-renderer.component.scss']
})
export class BaseDefinitionRendererComponent {
  @Input() fieldFG: FormGroup;
  @Input() selectedType: string;

  constructor(public fb: FormBuilder){}

  createFormControlIfNotExists(controlName: string, defaultValue: any, validatorOptions?: any[]): FormControl {
    let fc = this.fieldFG.get(controlName) as FormControl;
    if (!fc) {
      this.fieldFG.addControl(controlName, this.fb.control(defaultValue, validatorOptions));
      fc = this.fieldFG.get(controlName) as FormControl;
    }
    return fc;
  }
}
