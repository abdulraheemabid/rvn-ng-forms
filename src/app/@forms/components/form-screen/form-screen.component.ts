import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { IForm } from 'src/app/@shared/rvn-forms/types';
import { CreateOrEdit } from 'src/app/@shared/rvn-core/utils/types';
import { AppService } from 'src/app/app.service';
import { RvnSnackBarService } from 'src/app/@shared/rvn-core/services/rvn-snack-bar/rvn-snack-bar.service';
import { FormApiService } from 'src/app/@shared/rvn-services/form-api/form-api.service';
import { RvnButtonInput } from 'src/app/@shared/rvn-core/components/rvn-button/rvn-button.input';

@Component({
  selector: 'form-screen',
  templateUrl: './form-screen.component.html',
  styleUrls: ['./form-screen.component.scss']
})
export class FormScreenComponent implements OnInit {

  constructor(
    private formApiService: FormApiService,
    private appService: AppService,
    private snackBarService: RvnSnackBarService,
    private route: ActivatedRoute) { }

  formDefinitionFG: FormGroup;
  formDefinition: IForm;
  markFormDefinitionFGAsDirty$ = new Subject();
  mode: CreateOrEdit;
  initDone: boolean = false;
  submitButtonConfig: RvnButtonInput = { type: 'icon-text-primary', icon: 'save', color: 'primary' };
  orignalFormName: string;


  ngOnInit(): void {

    const route = this.route.snapshot;
    this.mode = route.url[route.url.length - 1].path === "edit" ? "edit" : "create";

    if (this.mode === "create") {
      this.appService.setToolBarHeading("Create New Form");
      this.initDone = true;
    } else {
      this.appService.setToolBarHeading("Edit Form");
      const formId = route.params["id"];

      this.formApiService.getForm(formId).subscribe(
        value => {
          this.orignalFormName = value.name;
          this.formDefinition = value;
          this.initDone = true;
        },
        err => {
          this.navigateToFormsList();
        }
      );
    }

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

      if (this.mode === "create")
        this.formApiService.createForm(this.formDefinition).subscribe(
          _ => this.navigateToFormsList()
        );

      else {

        //name field should only be added if its changed
        if (this.formDefinition.name === this.orignalFormName)
          delete this.formDefinition.name;

        this.formApiService.updateForm(this.formDefinition).subscribe(
          _ => this.navigateToFormsList()
        );
      }


    } else {
      this.snackBarService.showErrorAlert("Form is not valid. Please recheck");
    }
  }

  navigateToFormsList() {
    this.appService.navigate("forms");
  }

}
