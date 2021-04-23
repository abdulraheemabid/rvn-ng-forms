import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RvnButtonInput } from 'src/app/@shared/base-components/rvn-button/rvn-button.input';
import { RvnInputInput } from 'src/app/@shared/base-components/rvn-input/rvn-input.input';
import { RvnFormService } from 'src/app/@shared/forms/services/form.service';

@Component({
  selector: 'form-definition',
  templateUrl: './form-definition.component.html',
  styleUrls: ['./form-definition.component.scss']
})
export class FormDefinitionComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  initDone: boolean = false;
  formCtrl: FormGroup;

  //UI control params
  formNameCompParam: RvnInputInput = { label: 'Name', placeholder: 'Minimum 3 characters', required: true, styleVersion: "v2" };
  fieldAddCompParam: RvnButtonInput = { type: 'icon-text-secondary', icon: 'add' };
  deleteFieldCompParam: RvnButtonInput = { type: 'icon', icon: 'delete' };


  get fieldFormGroupTemplate() {
    return { name: ['', Validators.required], type: ['', Validators.required] }
  };

  get fieldGroups(): FormArray {
    return this.formCtrl.get('fields') as FormArray;
  };

  get formNameCtrl(): FormControl {
    return this.formCtrl.get('formName') as FormControl;
  }


  ngOnInit(): void {
    this.initFormCtrl();
    this.initDone = true;
  }

  initFormCtrl() {
    this.formCtrl = this.fb.group({
      formName: ['', Validators.required],
      fields: this.fb.array([
        this.fb.group(this.fieldFormGroupTemplate)
      ])
    });
  }

  addField() {
    let fg = this.fb.group(this.fieldFormGroupTemplate);
    this.fieldGroups.push(fg);
  }

  deleteField(index: number) {
    if (this.fieldGroups.length > 1)
      this.fieldGroups.removeAt(index);
  }
}


 // let a = this.formCtrl.get("fields").get("0") as FormGroup;
    // console.log("1", a.get("test"));
    // a.addControl('test', this.fb.control(''));
    // console.log("2", a.get("test"));