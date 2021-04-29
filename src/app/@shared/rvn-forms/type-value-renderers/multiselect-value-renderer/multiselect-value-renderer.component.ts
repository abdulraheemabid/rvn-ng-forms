import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UIControlEnum } from '../../types';
import { BaseValueRendererComponent } from '../base-value-renderer/base-value-renderer.component';

@Component({
  selector: 'multiselect-value-renderer',
  templateUrl: './multiselect-value-renderer.component.html',
  styleUrls: ['./multiselect-value-renderer.component.scss']
})
export class MultiselectValueRendererComponent extends BaseValueRendererComponent implements OnInit {

  fg: FormGroup;
  params: any;

  ngOnInit(): void {

    this.params = {
      label: this.fieldDefinition.name,
      required: this.fieldDefinition.required
    }

    switch (this.UIControl) {
      case UIControlEnum.CHECKBOX:

        this.params.checkboxOptions = this.fieldDefinition.arrayValues;

        //checkbox needs formGroup instead of FC  
        this.fg = this.fb.group({});
        this.fg.valueChanges.subscribe(v => {
          this.valueFC.setValue(this.fg.get("checkboxArray").value);
        })

        break;
      case UIControlEnum.CHIPSINPUT:
        this.params.placeholder = "Pick values from list";
        this.params.autoCompleteOption = this.fieldDefinition.arrayValues;
        break;
    }

  }

}
