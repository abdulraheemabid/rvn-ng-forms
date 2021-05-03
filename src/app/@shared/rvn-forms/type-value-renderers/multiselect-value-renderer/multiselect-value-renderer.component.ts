import { Component, OnInit } from '@angular/core';
import { BaseValueRendererComponent } from '../base-value-renderer/base-value-renderer.component';

@Component({
  selector: 'multiselect-value-renderer',
  templateUrl: './multiselect-value-renderer.component.html',
  styleUrls: ['./multiselect-value-renderer.component.scss']
})
export class MultiselectValueRendererComponent extends BaseValueRendererComponent implements OnInit {

  ngOnInit(): void {
  }

}
