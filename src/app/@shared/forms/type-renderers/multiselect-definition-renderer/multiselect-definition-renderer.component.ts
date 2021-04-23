import { Component, OnInit } from '@angular/core';
import { BaseDefinitionRendererComponent } from '../base-definition-renderer/base-definition-renderer.component';

@Component({
  selector: 'multiselect-definition-renderer',
  templateUrl: './multiselect-definition-renderer.component.html',
  styleUrls: ['./multiselect-definition-renderer.component.scss']
})
export class MultiselectDefinitionRendererComponent extends BaseDefinitionRendererComponent implements OnInit {

  ngOnInit(): void {
  }

}
