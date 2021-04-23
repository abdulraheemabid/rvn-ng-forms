import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'base-definition-renderer',
  templateUrl: './base-definition-renderer.component.html',
  styleUrls: ['./base-definition-renderer.component.scss']
})
export class BaseDefinitionRendererComponent {
  @Input() fieldFG: FormGroup;
  @Input() selectedType: string;

  constructor(public fb: FormBuilder){}
}
