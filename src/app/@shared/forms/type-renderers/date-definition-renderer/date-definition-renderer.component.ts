import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BaseDefinitionRendererComponent } from '../base-definition-renderer/base-definition-renderer.component';

@Component({
  selector: 'date-definition-renderer',
  templateUrl: './date-definition-renderer.component.html',
  styleUrls: ['./date-definition-renderer.component.scss']
})
export class DateDefinitionRendererComponent extends BaseDefinitionRendererComponent implements OnInit {

  displayAsFC: FormControl;
  

  ngOnInit(): void {
    let fc = this.fieldFG.get("displayAs") as FormControl;
    if (!fc) {
      this.fieldFG.addControl("displayAs", this.fb.control('', [Validators.required]));
      fc = this.fieldFG.get("displayAs") as FormControl;
    }
    this.displayAsFC = fc;
  }

}
