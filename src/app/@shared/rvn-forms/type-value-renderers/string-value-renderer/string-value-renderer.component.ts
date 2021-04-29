import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RvnInputInput } from 'src/app/@shared/rvn-core/components/rvn-input/rvn-input.input';
import { BaseValueRendererComponent } from '../base-value-renderer/base-value-renderer.component';

@Component({
  selector: 'string-value-renderer',
  templateUrl: './string-value-renderer.component.html',
  styleUrls: ['./string-value-renderer.component.scss']
})
export class StringValueRendererComponent extends BaseValueRendererComponent {

  params: RvnInputInput;

  ngOnInit(): void {
    super.ngOnInit();
    
    this.params = {
      label: this.fieldDefinition.name,
      placeholder: "Enter text value",
      required:  this.fieldDefinition.required,
      type: 'text'
    }
  }

}
