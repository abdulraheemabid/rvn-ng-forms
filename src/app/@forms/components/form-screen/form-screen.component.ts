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
  formDefinition: IForm;

  markFormDefinitionFGAsDirty$ = new Subject();

  ngOnInit(): void {
    this.appService.setToolBarHeading("Create New Form");
  }

  onFormDeifitionUpdate(form: FormGroup) {
    this.formDefinitionFG = form;
    //TODO: if (this.formDefinitionFG.status === "VALID")
    this.formDefinition = this.getTransformedValueFromFG(form)
  }

  getTransformedValueFromFG(formGroup: FormGroup) {
    let raw = formGroup.getRawValue();
    raw.fields.forEach(f => f.type = f.type.key);

    //TODO: doing this just for preview. on actual rendering, we will already have id
    raw.fields.forEach(f => f.id = f.attributes.position);

    return raw;
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
