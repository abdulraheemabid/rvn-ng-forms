import { Component, Input, OnInit } from '@angular/core';
import { BaseDefinitionRendererComponent } from '../base-definition-renderer/base-definition-renderer.component';

@Component({
  selector: 'bool-definition-renderer',
  templateUrl: './bool-definition-renderer.component.html',
  styleUrls: ['./bool-definition-renderer.component.scss']
})
export class BoolDefinitionRendererComponent extends BaseDefinitionRendererComponent implements OnInit {

  @Input() name: string;

  ngOnInit(): void {
  }

}
