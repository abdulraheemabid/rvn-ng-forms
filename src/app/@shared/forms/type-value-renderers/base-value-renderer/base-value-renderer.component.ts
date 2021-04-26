import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IForm, UIControlEnum } from '../../types';

@Component({
  selector: 'base-value-renderer',
  templateUrl: './base-value-renderer.component.html',
  styleUrls: ['./base-value-renderer.component.scss']
})
export class BaseValueRendererComponent {
  @Input() recordFG: FormGroup;
  @Input() UIControl: UIControlEnum;

  constructor() { }
}
