import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { IForm } from 'src/app/@shared/forms/types';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'form-screen',
  templateUrl: './form-screen.component.html',
  styleUrls: ['./form-screen.component.scss']
})
export class FormScreenComponent implements OnInit {

  constructor(private appService: AppService) { }

  formDefinitionFG: FormGroup;

  markFormDefinitionFGAsDirty$ = new Subject();

  get formDefinition(): IForm {
    return this.formDefinitionFG.getRawValue();
  }

  ngOnInit(): void {
    this.appService.setToolBarHeading("Create New Form");
  }

  onFormDeifitionUpdate(form: FormGroup) {
    this.formDefinitionFG = form;
  }

  saveForm() {
    console.log(this.formDefinition);

    this.markFormDefinitionFGAsDirty$.next();

    if (this.formDefinitionFG.status === "VALID") {
      // Save form
      console.log("Saved YAYYYY!!");
    }
  }

}
