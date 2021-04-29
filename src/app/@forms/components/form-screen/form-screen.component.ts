import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IForm } from 'src/app/@shared/forms/types';
import { RvnSnackBarService } from 'src/app/@shared/services/snack-bar/snack-bar.service';
import { CreateOrEdit } from 'src/app/@shared/utils/types';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'form-screen',
  templateUrl: './form-screen.component.html',
  styleUrls: ['./form-screen.component.scss']
})
export class FormScreenComponent implements OnInit {

  constructor(private appService: AppService, private snackBarService: RvnSnackBarService, private route: ActivatedRoute) { }

  formDefinitionFG: FormGroup;
  formDefinition: IForm;
  markFormDefinitionFGAsDirty$ = new Subject();
  mode: CreateOrEdit;


  ngOnInit(): void {

    this.route.url.pipe(
      map(value => {
        this.mode = value[value.length - 1].path === "edit" ? "edit" : "create";
      }))
      .subscribe(_ => {
        if (this.mode === "create")
          this.appService.setToolBarHeading("Create New Form");
        else {
          this.appService.setToolBarHeading("Edit Form");
          //TODO: temp, get this from api
          this.formDefinition = {
            "formId": 1,
            "name": "Form name", "fields": [
              { "name": "field 1", "type": "STRING", "required": true, "attributes": { "_expanded": true, "position": 0 }, "id": 0 },
              { "name": "field 2", "type": "BOOL", "required": false, "attributes": { "_expanded": true, "position": 1, "displayAs": { "key": "RADIO", "value": "Radio" } }, "id": 1 },
              { "name": "Field 3", "type": "MULTISELECT", "required": false, "attributes": { "_expanded": true, "position": 2, "displayAs": { "key": "CHECKBOX", "value": "Chekbox" } }, "arrayValues": [{ "key": 0, "value": "a" }, { "key": 1, "value": "b" }, { "key": 2, "value": "c" }], "id": 2 }
            ]
          } as any;
        }
      });
  }

  onFormDeifitionUpdate(form: FormGroup) {
    this.formDefinitionFG = form;
    if (this.formDefinitionFG.status === "VALID")
      this.formDefinition = this.getTransformedValueFromFG(form)
  }

  getTransformedValueFromFG(formGroup: FormGroup) {
    return formGroup.getRawValue();
  }

  saveForm() {
    this.markFormDefinitionFGAsDirty$.next();

    if (this.formDefinitionFG.status === "VALID") {
      // Save form
      console.log("Saved YAYYYY!!");
    } else {
      this.snackBarService.showErrorAlert("Form is not valid. Please recheck");
    }
  }

}
