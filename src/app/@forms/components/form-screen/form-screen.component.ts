import { Component, OnInit } from '@angular/core';
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
      }),
    )
      .subscribe(_ => {
        if (this.mode === "create")
          this.appService.setToolBarHeading("Create New Form");
        else
        this.appService.setToolBarHeading("Edit Form");
      });
  }

  onFormDeifitionUpdate(form: FormGroup) {
    this.formDefinitionFG = form;
    if (this.formDefinitionFG.status === "VALID")
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
    } else {
      this.snackBarService.showErrorAlert("Form is not valid. Please recheck");
    }
  }

}
