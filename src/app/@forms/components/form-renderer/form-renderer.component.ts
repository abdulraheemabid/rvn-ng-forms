import { Component, OnChanges, Input, ViewChildren, ViewContainerRef, QueryList, SimpleChanges, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Subject } from "rxjs";
import { RvnSnackBarService } from "src/app/@shared/rvn-core/services/rvn-snack-bar/rvn-snack-bar.service";
import { isNullOrUndefined } from "src/app/@shared/rvn-core/utils/funtions.util";
import { CreateOrEdit } from "src/app/@shared/rvn-core/utils/types";
import { IForm, IFormField, IRecord } from "src/app/@shared/rvn-forms/types";
import { FormService } from "src/app/@shared/rvn-services/form/form.service";
import { ReactiveFormUtilityService } from "src/app/@shared/rvn-services/reactive-form-utility/reactive-form-utility.service";


@Component({
  selector: 'form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss']
})
export class FormRendererComponent implements OnChanges {

  constructor(private formService: FormService,
    private snackBarService: RvnSnackBarService,
    private utilityService: ReactiveFormUtilityService) { }

  @Input() formDefinition: IForm;
  @Input() mode: CreateOrEdit | "preview" | "text-preview" = "preview";
  @Input() record: IRecord;
  @Input() markFGAsDirtySubject$: Subject<any>;
  @Output() recordUpdate: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @ViewChildren("fieldAnchorPoint", { read: ViewContainerRef }) fieldAnchorPoints: QueryList<ViewContainerRef>;
  recordFG: FormGroup;
  // for preview mode, the id for each fc will be the name of each field as we dont have the id yet.
  keyToUseForFieldControl: "name" | "id" = "id";
  isChildForm: boolean;

  ngOnChanges(changes: SimpleChanges): void {

    this.setPramsAccordingToMode();
    this.sortFieldsByPosition();
    this.generateRecordFormGroup();
    this.handleMarkingAsDirty();
    this.checkIfChildForm();

    this.recordFG.valueChanges.subscribe(value => this.recordUpdate.emit(this.recordFG));

    // TODO: need settimeout so that ngFor is done initializing. Cant find appropriate hook
    setTimeout(() => { this.renderControlForEachField() });
  }

  setPramsAccordingToMode() {
    if (this.mode === "preview") {
      this.keyToUseForFieldControl = "name";
    };
  }

  sortFieldsByPosition() {
    this.formDefinition.fields = this.formDefinition.fields.sort((a, b) => a.attributes.position - b.attributes.position);
  }

  generateRecordFormGroup() {
    this.recordFG = (this.mode === "edit" && this.record) ?
      this.formService.getRecordFG(this.formDefinition, this.record) :
      this.formService.getNewRecordFG(this.formDefinition, this.keyToUseForFieldControl);

    this.recordUpdate.emit(this.recordFG);
  }

  checkIfChildForm() {
    this.isChildForm = !isNullOrUndefined(this.formDefinition?.attributes?.parentForm?.formId);
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
      this.formService.injectTypeInputRenderer(field, ref, this.recordFG.get("entry").get(fcName) as FormControl).subscribe(() => { }, err => { });
    }
  }

  handleMarkingAsDirty() {
    if (this.markFGAsDirtySubject$)
      this.markFGAsDirtySubject$.subscribe(_ => {
        this.utilityService.markNestedFormGroupDirty(this.recordFG);
      });
  }

  submit() {
    if (this.mode === "preview") {
      this.utilityService.markNestedFormGroupDirty(this.recordFG);

      if (this.recordFG.status !== "VALID")
        this.snackBarService.showErrorAlert("All entered values are not valid. Please recheck");


      if (this.recordFG.status === "VALID")
        this.snackBarService.showSuccessAlert("Form is valid. This record will be posted to server");
    }
  }
}
