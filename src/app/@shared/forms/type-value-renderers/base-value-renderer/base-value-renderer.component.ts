import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicComponentService } from 'src/app/@shared/services/dynamic-component/dynamic-component.service';
import { IFormField, UIControlEnum } from '../../types';

@Component({
  selector: 'base-value-renderer',
  templateUrl: './base-value-renderer.component.html',
  styleUrls: ['./base-value-renderer.component.scss']
})
export class BaseValueRendererComponent {
  constructor(public dynamicComponentService: DynamicComponentService) { }

  @ViewChild('ctrlAnchorPoint', { read: ViewContainerRef, static: true }) ctrlAnchorPoint: ViewContainerRef;
  @Input() recordFG: FormGroup;
  @Input() UIControl: UIControlEnum;
  @Input() fieldDefinition: IFormField;

  ngOnInit() { }

}
