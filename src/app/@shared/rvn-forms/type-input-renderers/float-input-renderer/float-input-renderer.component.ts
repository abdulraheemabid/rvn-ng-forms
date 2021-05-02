import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RvnInputInput } from 'src/app/@shared/rvn-core/components/rvn-input/rvn-input.input';
import { BaseInputRendererComponent } from '../base-input-renderer/base-input-renderer.component';

@Component({
  selector: 'float-input-renderer',
  templateUrl: './float-input-renderer.component.html',
  styleUrls: ['./float-input-renderer.component.scss']
})
export class FloatInputRendererComponent extends BaseInputRendererComponent implements OnInit {

  config: RvnInputInput;

  ngOnInit(): void {

    this.config = {
      label: this.fieldDefinition.name,
      placeholder: "Enter floating number",
      required: this.fieldDefinition.required,
      type: 'number'
    }

    // converting string value to number
    this.valueFC.valueChanges.subscribe(v => {
      try {
        this.valueFC.setValue(Number(v), { emitEvent: false });
      } catch (err) { }
    })
  }

}
