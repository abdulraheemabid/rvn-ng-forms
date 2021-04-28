import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { RvnButtonInput } from 'src/app/@shared/base-components/rvn-button/rvn-button.input';
import { RvnInputInput } from 'src/app/@shared/base-components/rvn-input/rvn-input.input';
import { FieldTypeEnum, IForm } from 'src/app/@shared/forms/types';
import { ReactiveFormUtilityService } from 'src/app/@shared/services/reactive-form-utility/reactive-form-utility.service';
import { isNullOrUndefined } from 'src/app/@shared/utils/funtions.util';
import { CreateOrEdit } from 'src/app/@shared/utils/types';

@Component({
  selector: 'form-definition',
  templateUrl: './form-definition.component.html',
  styleUrls: ['./form-definition.component.scss']
})
export class FormDefinitionComponent implements OnInit {

  constructor(private fb: FormBuilder, private privateformUitilityService: ReactiveFormUtilityService) { }

  @ViewChild("accordion", { read: ElementRef }) accordion;

  @Input() form: IForm;
  @Input() markFGAsDirtySubject$: Subject<any>;
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

  get fieldFormGroupTemplate() {
    return {
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      required: [false],
      attributes: this.fb.group({
        _expanded: [true],
        position: [null]
      })
    };
  };

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
    this.formGrp = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      fields: this.fb.array([])
    });

    this.addField();

    this.formDefinitionUpdate.emit(this.formGrp);

    this.formGrp.valueChanges.subscribe(val => {
      this.formDefinitionUpdate.emit(this.formGrp);
    });
  }


  initFormGroupFromDefinition() {
    this.formGrp = this.createFGFromIForm(this.form);

    this.formGrp.valueChanges.subscribe(val => {
      this.formDefinitionUpdate.emit(this.formGrp);
      console.log(this.formGrp);
    });
  }







  createFGFromIForm(form: IForm) {
    let fg = this.fb.group({
      formId: [form.formId],
      attributes: [form.attributes],
      name: [form.name, [Validators.required, Validators.minLength(3)]],
      fields: this.fb.array([])
    });

    let fields = fg.get("fields") as FormArray;

    form.fields.forEach(fieldDef => {
      let fieldGrp = this.fb.group({
        id: [fieldDef.id],
        name: [fieldDef.name, [Validators.required, Validators.minLength(3)]],
        type: [fieldDef.type, Validators.required],
        required: [fieldDef.required],
        attributes: this.fb.group({
          _expanded: [true],
          position: [null]
        })
      });

      if (typeof fieldDef.arrayValues !== "undefined") fieldGrp.addControl("arrayValues", this.fb.control(fieldDef.arrayValues));
      if (typeof fieldDef.attributes !== "undefined") fieldGrp.addControl("attributes", this.fb.group({}));
      if (typeof fieldDef?.attributes?.position !== "undefined") {
        let attr = fieldGrp.get("attributes") as FormGroup;
        attr.addControl("position", this.fb.control(fieldDef.attributes.position));
      };
      if (typeof fieldDef?.attributes?.displayAs !== "undefined") {
        let attr = fieldGrp.get("attributes") as FormGroup;
        attr.addControl("displayAs", this.fb.control(fieldDef.attributes.displayAs));
      };

      fields.push(fieldGrp);
    });

    return fg;

  }







  handleMarkingAsDirty() {
    if (this.markFGAsDirtySubject$)
      this.markFGAsDirtySubject$.subscribe(_ => {

        // Mark all as dirty
        this.privateformUitilityService.markNestedFormGroupDirty(this.formGrp);

        // expand all INVALID fields
        this.fieldGroups.controls
          .filter(c => c.status === "INVALID")
          .forEach(c => c.get("attributes").get("_expanded").setValue(true));

        this.validated = true;
      });
  }

  addField() {
    let fg = this.fb.group(this.fieldFormGroupTemplate);
    this.fieldGroups.push(fg);
    fg.get("attributes").get("position").setValue(this.fieldGroups.controls.length - 1);
    this.scrollToBottomOfFieldsList();
  }

  deleteField(index: number) {
    if (this.fieldGroups.length > 1)
      this.fieldGroups.removeAt(index);
    this.scrollToBottomOfFieldsList();
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
    this.fieldGroups.controls.forEach(c => c.get("attributes").get("position").setValue(this.fieldGroups.controls.indexOf(c)));
  }

  collapseAllFields() {
    this.fieldGroups.controls.forEach(c => c.get("attributes").get("_expanded").setValue(false, { emitEvent: false }));
  }

  expandAllFields() {
    this.fieldGroups.controls.forEach(c => c.get("attributes").get("_expanded").setValue(true, { emitEvent: false }));
  }
}