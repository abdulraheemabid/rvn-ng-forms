import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BaseValueRendererComponent } from '../base-value-renderer/base-value-renderer.component';

@Component({
  selector: 'bool-value-renderer',
  templateUrl: './bool-value-renderer.component.html',
  styleUrls: ['./bool-value-renderer.component.scss']
})
export class BoolValueRendererComponent extends BaseValueRendererComponent implements OnInit {

  displayAsFC: FormControl;

  ngOnInit(): void {
    this.displayAsFC = this.createFormControlIfNotExists("displayAs", "", [Validators.required], true);
  }

}
