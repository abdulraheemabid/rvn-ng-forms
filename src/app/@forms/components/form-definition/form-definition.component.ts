import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RvnButtonInput } from 'src/app/@shared/base-components/rvn-button/rvn-button.input';
import { RvnInputInput } from 'src/app/@shared/base-components/rvn-input/rvn-input.input';

@Component({
  selector: 'form-definition',
  templateUrl: './form-definition.component.html',
  styleUrls: ['./form-definition.component.scss']
})
export class FormDefinitionComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  @ViewChild("accordion", { read: ElementRef }) accordion;

  initDone: boolean = false;
  formCtrl: FormGroup;

  //UI control params
  formNameCompParam: RvnInputInput = { label: 'Name', placeholder: 'Minimum 3 characters', required: true };
  fieldAddCompParam: RvnButtonInput = { type: 'icon-text-primary', icon: 'add', color: "accent" };
  collapseCompParam: RvnButtonInput = { type: 'icon', icon: 'unfold_less', color: "accent" };
  expandCompParam: RvnButtonInput = { type: 'icon', icon: 'unfold_more', color: "accent" };
  deleteFieldCompParam: RvnButtonInput = { type: 'secondary', color: "warn" };


  get fieldFormGroupTemplate() {
    return { name: ['', [Validators.required, Validators.minLength(3)]], type: ['', Validators.required], required: [false], _expanded: [true] }
  };

  get fieldGroups(): FormArray {
    return this.formCtrl.get('fields') as FormArray;
  };

  get formNameCtrl(): FormControl {
    return this.formCtrl.get('formName') as FormControl;
  }

  collapseAllFields() {
    this.fieldGroups.controls.forEach(c => c.get("_expanded").setValue(false));
  }

  expandAllFields() {
    this.fieldGroups.controls.forEach(c => c.get("_expanded").setValue(true));
  }

  ngOnInit(): void {
    this.initFormCtrl();
    this.initDone = true;
  }

  initFormCtrl() {
    this.formCtrl = this.fb.group({
      formName: ['', [Validators.required, Validators.minLength(3)]],
      fields: this.fb.array([
        this.fb.group(this.fieldFormGroupTemplate)
      ])
    });

    this.formCtrl.valueChanges.subscribe(val => console.log(val));
  }

  addField() {
    let fg = this.fb.group(this.fieldFormGroupTemplate);
    this.fieldGroups.push(fg);
    this.scrollToBottomOfFieldsList();
  }

  deleteField(index: number) {
    if (this.fieldGroups.length > 1)
      this.fieldGroups.removeAt(index);
  }

  changePositionOfField(event) {
    let control = this.fieldGroups.controls.splice(event.previousIndex, 1)[0];
    this.fieldGroups.controls.splice(event.currentIndex, 0, control);
  }

  scrollToBottomOfFieldsList(): void {
    setTimeout(() => this.accordion.nativeElement.lastElementChild.scrollIntoView({ behavior: "smooth", block: "end" }));
  }
}