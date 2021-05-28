import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { switchMap } from 'rxjs/operators';
import { RvnSnackBarService, CreateOrEdit, RvnButtonInput, isNullOrUndefined } from '@abdulraheemabid/rvn-pkg-ng-core';
import { FormApiService } from '@abdulraheemabid/rvn-pkg-ng-forms';
import { IForm } from '@abdulraheemabid/rvn-pkg-ng-forms/lib/types';

/**
 * This screen is used when creating or editing a form.
 * 
 * It brings in the form definition in case of editing.
 * 
 * It displayes two main components. `FormDefinitionComponent` & `FormRendererComponent`. 
 * As user is creating or editing the form (attributes or fields), they will see live preview of how
 * the end user will see the form when they are filling it.
 * 
 */
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

  formDefinitionFG: FormGroup = new FormGroup({});
  formDefinition: IForm;
  markFormDefinitionFGAsDirty$ = new Subject();
  mode: CreateOrEdit;
  initDone: boolean = false;
  submitButtonConfig: RvnButtonInput = { type: 'icon-text-primary', icon: 'save', color: 'primary' };
  orignalFormName: string;
  // used in create mode to populate parent selector
  formsList: IForm[];


  ngOnInit(): void {

    const route = this.route.snapshot;
    this.mode = route.url[route.url.length - 1].path === "edit" ? "edit" : "create";

    if (this.mode === "create") this.handleInitForCreateMode();
    else this.handleInitForEditMode(route);
    
  }

  handleInitForCreateMode() {
    this.appService.setToolBarHeading("Create New Form");

    this.formApiService.getForms().subscribe(forms => {
      this.formsList = forms;
      this.initDone = true;
    });
  }

  handleInitForEditMode(route) {
    this.appService.setToolBarHeading("Edit Form");
    const formId = route.params["id"];

    this.formApiService.getForm(formId).pipe(
      switchMap(form => {
        this.orignalFormName = form.name;
        this.formDefinition = form;
        return !isNullOrUndefined(form?.attributes?.parentForm?.formId) ?
          this.formApiService.getForm(form.attributes.parentForm.formId) :
          of(null);
      })
    ).subscribe(
      parent => {
        this.formsList = !isNullOrUndefined(parent) ? [parent] : [];
        this.initDone = true;
      },
      err => this.navigateToFormsList()
    );
  }

  onFormDeifitionUpdate(form: FormGroup) {
    this.formDefinitionFG = form;
    if (this.formDefinitionFG.status === "VALID") this.formDefinition = this.getTransformedValueFromFG(form)
  }

  getTransformedValueFromFG(formGroup: FormGroup) {
    return formGroup.getRawValue();
  }

  saveForm() {
    this.markFormDefinitionFGAsDirty$.next();

    if (this.formDefinitionFG.status !== "VALID") {
      this.snackBarService.showErrorAlert("Form is not valid. Please recheck");
      return;
    }

    if (this.mode === "create") this.createForm();
    else this.updateForm();
  }

  createForm() {
    this.formApiService.createForm(this.formDefinition)
      .subscribe(_ => this.navigateToFormsList());
  }

  updateForm() {
    //name field should only be added if its changed
    if (this.formDefinition.name === this.orignalFormName) delete this.formDefinition.name;

    this.formApiService.updateForm(this.formDefinition)
      .subscribe(_ => this.navigateToFormsList());
  }

  navigateToFormsList() {
    this.appService.navigate("forms");
  }

}
