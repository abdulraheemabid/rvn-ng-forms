import { Component, Input, OnChanges, QueryList, SimpleChanges, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RvnFormService } from 'src/app/@shared/forms/services/form.service';
import { IForm, IFormField } from 'src/app/@shared/forms/types';
import { ReactiveFormUtilityService } from 'src/app/@shared/services/reactive-form-utility/reactive-form-utility.service';
import { RvnSnackBarService } from 'src/app/@shared/services/snack-bar/snack-bar.service';
import { isNullOrUndefined } from 'src/app/@shared/utils/funtions.util';

@Component({
  selector: 'form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss']
})
export class FormRendererComponent implements OnChanges {

  constructor(private formService: RvnFormService, private snackBarService: RvnSnackBarService, private utilityService: ReactiveFormUtilityService) { }

  @Input() formDefinition: IForm;
  @Input() mode: "preview" | "add" | "edit" = "preview";
  @ViewChildren("fieldAnchorPoint", { read: ViewContainerRef }) fieldAnchorPoints: QueryList<ViewContainerRef>;

  recordFG: FormGroup;
  submitBtnType: any = "primary";
  submitBtnColor: any = "primary";

  ngOnInit() {
    if (this.mode === "preview") {
      this.submitBtnColor = "accent";
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formDefinition.fields = this.formDefinition.fields.sort((a, b) => a.attributes.position - b.attributes.position);
    this.recordFG = this.formService.generateRecordFormGroup(this.formDefinition);
    // TODO: need settimeout so that ngFor is done initializing. Cant find appropriate hook
    setTimeout(() => this.formDefinition.fields.forEach(f => this.renderFormValueUI(f)));
  }

  renderFormValueUI(field: IFormField) {
    if (!isNullOrUndefined(field?.type) && !isNullOrUndefined(field.attributes?.position)) {

      const ref = this.fieldAnchorPoints.get(field.attributes.position);
      this.formService.injectTypeValueRenderer(field, ref, this.recordFG)
        .subscribe(() => { }, err => { });

    }
  }

  submit() {
    this.utilityService.markNestedFormGroupDirty(this.recordFG);
    
    if (this.recordFG.status !== "VALID") {
      this.snackBarService.showErrorAlert("All entered values are not valid. Please recheck");
    }

    if (this.recordFG.status === "VALID") {

      if (this.mode === "preview") {
        this.snackBarService.showSuccessAlert("Form is valid. This record will be posted to server");
      }

    }

  }

}
