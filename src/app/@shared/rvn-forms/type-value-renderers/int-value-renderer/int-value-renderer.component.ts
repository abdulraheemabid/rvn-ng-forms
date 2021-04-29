import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RvnInputInput } from 'src/app/@shared/rvn-core/components/rvn-input/rvn-input.input';
import { BaseValueRendererComponent } from '../base-value-renderer/base-value-renderer.component';

@Component({
  selector: 'int-value-renderer',
  templateUrl: './int-value-renderer.component.html',
  styleUrls: ['./int-value-renderer.component.scss']
})
export class IntValueRendererComponent extends BaseValueRendererComponent implements OnInit {

  params: RvnInputInput;

  ngOnInit(): void {

    this.params = {
      label: this.fieldDefinition.name,
      placeholder: "Enter number",
      required: this.fieldDefinition.required,
      type: 'number'
    }
  }
}
