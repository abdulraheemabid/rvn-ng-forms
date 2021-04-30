import { Component, OnChanges, Input, ViewChildren, ViewContainerRef, QueryList, SimpleChanges } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { RvnSnackBarService } from "src/app/@shared/rvn-core/services/rvn-snack-bar/rvn-snack-bar.service";
import { isNullOrUndefined } from "src/app/@shared/rvn-core/utils/funtions.util";
import { IForm, IFormField } from "src/app/@shared/rvn-forms/types";
import { FormService } from "src/app/@shared/rvn-services/form/form.service";
import { ReactiveFormUtilityService } from "src/app/@shared/rvn-services/reactive-form-utility/reactive-form-utility.service";


@Component({
  selector: 'form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss']
})
export class FormRendererComponent implements OnChanges {

  constructor(private formService: FormService, private snackBarService: RvnSnackBarService, private utilityService: ReactiveFormUtilityService) { }

  @Input() formDefinition: IForm;
  @Input() mode: "preview" | "add" | "edit" = "preview";
  @ViewChildren("fieldAnchorPoint", { read: ViewContainerRef }) fieldAnchorPoints: QueryList<ViewContainerRef>;
  recordFG: FormGroup;
  submitBtnType: any = "primary";
  submitBtnColor: any = "primary";
  // for preview mode, the id for each fc will be the name of each field as we dont have the id yet.
  keyToUseForFieldControl: "name" | "id" = "id";

  ngOnChanges(changes: SimpleChanges): void {

    this.setPramsAccordingToMode();
    this.sortFieldsByPosition();
    this.generateRecordFormGroup();

    // TODO: need settimeout so that ngFor is done initializing. Cant find appropriate hook
    setTimeout(() => { this.renderControlForEachField() });
  }

  setPramsAccordingToMode() {
    if (this.mode === "preview") {
      this.submitBtnColor = "accent";
      this.keyToUseForFieldControl = "name";
    };
  }

  sortFieldsByPosition() {
    this.formDefinition.fields = this.formDefinition.fields.sort((a, b) => a.attributes.position - b.attributes.position);
  }

  generateRecordFormGroup() {
    this.recordFG = this.formService.generateRecordFormGroup(this.formDefinition, this.keyToUseForFieldControl);
  }

  renderControlForEachField() {
    this.formDefinition.fields.forEach(f => {
      if (f.markDeleted !== true) this.renderUIControl(f)
    })
  }

  renderUIControl(field: IFormField) {
    if (!isNullOrUndefined(field?.type) && !isNullOrUndefined(field.attributes?.position)) {
      const ref = this.fieldAnchorPoints.get(field.attributes.position);
      const fcName = field[this.keyToUseForFieldControl.toString()].toString();
      this.formService.injectTypeValueRenderer(field, ref, this.recordFG.get(fcName) as FormControl).subscribe(() => { }, err => { });
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
