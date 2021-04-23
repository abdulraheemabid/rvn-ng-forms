import { Component, OnInit } from '@angular/core';
import { BaseDefinitionRendererComponent } from '../base-definition-renderer/base-definition-renderer.component';

@Component({
  selector: 'singleselect-definition-renderer',
  templateUrl: './singleselect-definition-renderer.component.html',
  styleUrls: ['./singleselect-definition-renderer.component.scss']
})
export class SingleselectDefinitionRendererComponent extends BaseDefinitionRendererComponent implements OnInit {

  ngOnInit(): void {
  }

}
