import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BaseValueRendererComponent } from '../base-value-renderer/base-value-renderer.component';

@Component({
  selector: 'multiselect-value-renderer',
  templateUrl: './multiselect-value-renderer.component.html',
  styleUrls: ['./multiselect-value-renderer.component.scss']
})
export class MultiselectValueRendererComponent extends BaseValueRendererComponent implements OnInit {

  displayAsFC: FormControl;
  arrayValues: FormControl;

  ngOnInit(): void {
    this.displayAsFC = this.createFormControlIfNotExists("displayAs", "", [Validators.required], true);
    this.arrayValues = this.createFormControlIfNotExists("arrayValues", "");
  }

}
