import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RvnInputInput } from 'src/app/@shared/base-components/rvn-input/rvn-input.input';
import { BaseValueRendererComponent } from '../base-value-renderer/base-value-renderer.component';

@Component({
  selector: 'float-value-renderer',
  templateUrl: './float-value-renderer.component.html',
  styleUrls: ['./float-value-renderer.component.scss']
})
export class FloatValueRendererComponent extends BaseValueRendererComponent implements OnInit {

  params: RvnInputInput;

  ngOnInit(): void {

    this.params = {
      label: this.fieldDefinition.name,
      placeholder: "Enter floating number",
      required: this.fieldDefinition.required,
      type: 'number'
    }
  }

}
