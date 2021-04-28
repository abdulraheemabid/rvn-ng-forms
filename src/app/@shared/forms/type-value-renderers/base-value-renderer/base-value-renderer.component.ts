import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicComponentService } from 'src/app/@shared/services/dynamic-component/dynamic-component.service';
import { IFormField, UIControlEnum } from '../../types';

@Component({
  selector: 'base-value-renderer',
  templateUrl: './base-value-renderer.component.html',
  styleUrls: ['./base-value-renderer.component.scss']
})
export class BaseValueRendererComponent {
  constructor(
    public dynamicComponentService: DynamicComponentService,
    public fb: FormBuilder) { }

  @ViewChild('ctrlAnchorPoint', { read: ViewContainerRef, static: true }) ctrlAnchorPoint: ViewContainerRef;
  @Input() recordFG: FormGroup;
  @Input() UIControl: UIControlEnum;
  @Input() fieldDefinition: IFormField;
  UIControlEnum = UIControlEnum;

  ngOnInit() { }

}
