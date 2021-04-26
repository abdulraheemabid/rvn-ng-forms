import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BaseValueRendererComponent } from '../base-value-renderer/base-value-renderer.component';

@Component({
  selector: 'singleselect-value-renderer',
  templateUrl: './singleselect-value-renderer.component.html',
  styleUrls: ['./singleselect-value-renderer.component.scss']
})
export class SingleselectValueRendererComponent extends BaseValueRendererComponent implements OnInit {

  displayAsFC: FormControl;
  arrayValues: FormControl;

  ngOnInit(): void {
    this.displayAsFC = this.createFormControlIfNotExists("displayAs", "", [Validators.required], true);
    this.arrayValues = this.createFormControlIfNotExists("arrayValues", "", [Validators.required]);
  }

}
