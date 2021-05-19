import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DynamicComponentService } from '../../services/dynamic-component/dynamic-component.service';
import { IFormField, UIControlEnum } from '../../types';

@Component({
  selector: 'base-input-renderer',
  templateUrl: './base-input-renderer.component.html',
  styleUrls: ['./base-input-renderer.component.scss']
})
export class BaseInputRendererComponent {
  constructor(
    public dynamicComponentService: DynamicComponentService,
    public fb: FormBuilder) { }

  @Input() valueFC: FormControl;
  @Input() UIControl: UIControlEnum;
  @Input() fieldDefinition: IFormField;
  UIControlEnum = UIControlEnum;

}
