import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UIControlEnum } from '../../types';
import { BaseValueRendererComponent } from '../base-value-renderer/base-value-renderer.component';

@Component({
  selector: 'singleselect-value-renderer',
  templateUrl: './singleselect-value-renderer.component.html',
  styleUrls: ['./singleselect-value-renderer.component.scss']
})
export class SingleselectValueRendererComponent extends BaseValueRendererComponent implements OnInit {

  params: any;

  ngOnInit(): void {

    this.params = {
      label: this.fieldDefinition.name,
      required: this.fieldDefinition.required
    }

    switch (this.UIControl) {
      case UIControlEnum.SELECT:
        this.params.placeholder = "Pick an option";
        this.params.selectOptions = this.fieldDefinition.arrayValues;
        break;
      case UIControlEnum.RADIO:
        this.params.radioOptions = this.fieldDefinition.arrayValues;
        break;
    }

  }

}
