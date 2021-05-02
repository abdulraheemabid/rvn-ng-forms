import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { RvnButtonInput } from 'src/app/@shared/rvn-core/components/rvn-button/rvn-button.input';
import { RvnInputInput } from 'src/app/@shared/rvn-core/components/rvn-input/rvn-input.input';
import { FormService } from 'src/app/@shared/rvn-services/form/form.service';
import { IForm } from 'src/app/@shared/rvn-forms/types';
import { ReactiveFormUtilityService } from 'src/app/@shared/rvn-services/reactive-form-utility/reactive-form-utility.service';
import { isNullOrUndefined } from 'src/app/@shared/rvn-core/utils/funtions.util';
import { CreateOrEdit } from 'src/app/@shared/rvn-core/utils/types';

@Component({
  selector: 'form-definition',
  templateUrl: './form-definition.component.html',
  styleUrls: ['./form-definition.component.scss']
})
export class FormDefinitionComponent implements OnInit {

  constructor(private fb: FormBuilder, private formUitilityService: ReactiveFormUtilityService, private formService: FormService) { }

  @ViewChild("accordion", { read: ElementRef }) accordion;

  @Input() form: IForm;
  @Input() markFGAsDirtySubject$: Subject<any>;
  @Input() mode: CreateOrEdit;
  @Output() formDefinitionUpdate: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  initDone: boolean = false;
  formGrp: FormGroup;
  validated = false;

  //UI control params
  formNameCompParam: RvnInputInput = { label: 'Name', placeholder: 'Minimum 3 characters', required: true };
  fieldAddCompParam: RvnButtonInput = { type: 'mini-fab', icon: 'add', color: "accent" };
  collapseCompParam: RvnButtonInput = { type: 'icon', icon: 'unfold_less', color: "accent" };
  expandCompParam: RvnButtonInput = { type: 'icon', icon: 'unfold_more', color: "accent" };
  deleteFieldCompParam: RvnButtonInput = { type: 'secondary', color: "warn" };
  undoDeleteFieldCompParam: RvnButtonInput = { type: 'secondary', color: "accent" };


  get fieldGroups(): FormArray {
    return this.formGrp.get('fields') as FormArray;
  };

  get formNameCtrl(): FormControl {
    return this.formGrp.get('name') as FormControl;
  }

  ngOnInit(): void {

    if (isNullOrUndefined(this.form))
      this.initNewFormGroup();
    else
      this.initFormGroupFromDefinition();

    this.handleMarkingAsDirty();
    this.initDone = true;
  }

  initNewFormGroup() {
    this.formGrp = this.formService.getNewDefinitionFG();

    this.addField();

    this.formDefinitionUpdate.emit(this.formGrp);

    this.formGrp.valueChanges.subscribe(val => {
      this.formDefinitionUpdate.emit(this.formGrp);
    });
  }


  initFormGroupFromDefinition() {
    this.formGrp = this.formService.getDefinitionFG(this.form);

    this.formGrp.valueChanges.subscribe(val => {
      this.formDefinitionUpdate.emit(this.formGrp);
    });
  }


  handleMarkingAsDirty() {
    if (this.markFGAsDirtySubject$)
      this.markFGAsDirtySubject$.subscribe(_ => {

        // Mark all as dirty
        this.formUitilityService.markNestedFormGroupDirty(this.formGrp);

        // expand all INVALID fields
        this.fieldGroups.controls
          .filter(c => c.status === "INVALID")
          .forEach(c => c.get("attributes").get("_expanded").setValue(true));

        this.validated = true;
      });
  }

  addField() {
    let fg = this.formService.getNewFieldFG();
    this.fieldGroups.push(fg);
    fg.get("attributes").get("position").setValue(this.fieldGroups.controls.length - 1);
    this.scrollToBottomOfFieldsList();
  }

  deleteField(index: number, fieldGroup: AbstractControl) {
    if (this.fieldGroups.length > 1) {
      if (!fieldGroup.get("markDeleted")) this.fieldGroups.removeAt(index);
      else fieldGroup.get("markDeleted").setValue(true);

      this.updatePositionAttributeOfAllFields();
    }
  }

  undoDelete(fieldGroup: AbstractControl) {
    fieldGroup.get("markDeleted").setValue(false);
    this.updatePositionAttributeOfAllFields();
  }

  changePositionOfField(event) {
    let control = this.fieldGroups.controls.splice(event.previousIndex, 1)[0];
    this.fieldGroups.controls.splice(event.currentIndex, 0, control);
    this.updatePositionAttributeOfAllFields();
  }

  scrollToBottomOfFieldsList(): void {
    setTimeout(() => this.accordion.nativeElement.lastElementChild.scrollIntoView({ behavior: "smooth", block: "end" }));
  }

  updatePositionAttributeOfAllFields() {
    let numberOfDeletedFields = 0;
    this.fieldGroups.controls.forEach(c => {
      if (c.get("markDeleted") !== null && c.get("markDeleted").value === true) {
        numberOfDeletedFields++;
        c.get("attributes").get("position").setValue(null);
      }
      else
        c.get("attributes").get("position").setValue(this.fieldGroups.controls.indexOf(c) - numberOfDeletedFields)
    });
  }

  collapseAllFields() {
    this.fieldGroups.controls.forEach(c => c.get("attributes").get("_expanded").setValue(false, { emitEvent: false }));
  }

  expandAllFields() {
    this.fieldGroups.controls.forEach(c => c.get("attributes").get("_expanded").setValue(true, { emitEvent: false }));
  }
}