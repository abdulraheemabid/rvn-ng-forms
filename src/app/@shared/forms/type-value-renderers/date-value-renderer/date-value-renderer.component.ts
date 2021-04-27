import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UIControlEnum } from '../../types';
import { BaseValueRendererComponent } from '../base-value-renderer/base-value-renderer.component';

@Component({
  selector: 'date-value-renderer',
  templateUrl: './date-value-renderer.component.html',
  styleUrls: ['./date-value-renderer.component.scss']
})
export class DateValueRendererComponent extends BaseValueRendererComponent implements OnInit {

  fc: FormControl;
  params: any;

  ngOnInit(): void {

    this.params = {
      label: this.fieldDefinition.name,
      required: this.fieldDefinition.required
    }

    switch (this.UIControl) {
      case UIControlEnum.INPUT:
        this.params.placeholder = "Enter a date"
        break;
      case UIControlEnum.DATEPICKER:
        this.params.placeholder = "Pick a date"
        break;
    }

    this.fc = this.recordFG.get(this.fieldDefinition.id.toString()) as FormControl;


  }
}
