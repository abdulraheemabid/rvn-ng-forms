import { Component, OnInit } from '@angular/core';
import { BaseDefinitionRendererComponent } from '../base-definition-renderer/base-definition-renderer.component';

@Component({
  selector: 'date-definition-renderer',
  templateUrl: './date-definition-renderer.component.html',
  styleUrls: ['./date-definition-renderer.component.scss']
})
export class DateDefinitionRendererComponent extends BaseDefinitionRendererComponent implements OnInit {

  ngOnInit(): void {
  }

}
