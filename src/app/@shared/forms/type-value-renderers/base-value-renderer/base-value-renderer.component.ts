import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'base-value-renderer',
  templateUrl: './base-value-renderer.component.html',
  styleUrls: ['./base-value-renderer.component.scss']
})
export class BaseValueRendererComponent {
  @Input() fieldFG: FormGroup;
  @Input() selectedType: string;

  constructor(public fb: FormBuilder) { }

  createFormControlIfNotExists(controlName: string, defaultValue: any, validatorOptions?: any[], insideAttributes: boolean = false): FormControl {

    if (insideAttributes) {
      let fc = this.fieldFG.get("attributes")?.get(controlName) as FormControl;
      if (!fc) {
        let attributesFG = this.fieldFG.get("attributes") as FormGroup;
        attributesFG.addControl(controlName, this.fb.control(defaultValue, validatorOptions));
        fc = this.fieldFG.get("attributes").get(controlName) as FormControl;
      }
      return fc;
    }

    let fc = this.fieldFG.get(controlName) as FormControl;
    if (!fc) {
      this.fieldFG.addControl(controlName, this.fb.control(defaultValue, validatorOptions));
      fc = this.fieldFG.get(controlName) as FormControl;
    }
    return fc;
  }
}
