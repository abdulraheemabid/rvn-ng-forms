import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RvnSelectInput } from 'src/app/@shared/base-components/rvn-select/rvn-select.input';
import { RvnFormService } from 'src/app/@shared/forms/form.service';
import { IForm, UIControlNameEnum } from 'src/app/@shared/forms/interfaces';

@Component({
  selector: 'form-definition',
  templateUrl: './form-definition.component.html',
  styleUrls: ['./form-definition.component.scss']
})
export class FormDefinitionComponent implements OnInit {

  constructor(
    private sharedFormService: RvnFormService,
    private fb: FormBuilder) { }


  initDone: boolean = false;
  formCtrl: FormGroup;

  // UI controls params
  fieldTypeCompParams: RvnSelectInput = { label: 'Type', placeholder: 'Select', required: true, selectOptions: null, 'styleVersion': 'v2' };
  displayAsCompParams: RvnSelectInput = { label: 'Dsiplay as', placeholder: 'Select', required: true, selectOptions: null, 'styleVersion': 'v2' };
  fieldTypeUIControlMappings: Map<string, UIControlNameEnum[]>;

  get fieldFormGroupTemplate() {
    return { name: ['', Validators.required], type: ['', Validators.required] }
  };

  get fieldCrtls(): FormArray {
    return this.formCtrl.get('fields') as FormArray;
  };

  get formNameCtrl(): FormControl {
    return this.formCtrl.get('formName') as FormControl;
  }


  ngOnInit(): void {
    this.initFormCtrl();
    this.initUIControls();
    this.initDone = true;
  }

  initFormCtrl() {
    this.formCtrl = this.fb.group({
      formName: ['', Validators.required],
      fields: this.fb.array([
        this.fb.group(this.fieldFormGroupTemplate)
      ])
    });

    this.onFieldTypeChange(this.formCtrl.get('fields').get('0').get('type') as FormControl);

    this.fieldTypeUIControlMappings = this.sharedFormService.getFieldTypeControlOptions();
  }

  initUIControls() {
    this.fieldTypeCompParams.selectOptions = this.sharedFormService.getFieldTypes();
  }

  addField() {
    let fg = this.fb.group(this.fieldFormGroupTemplate);
    this.fieldCrtls.push(fg);
    this.onFieldTypeChange(fg.get('type') as FormControl);
  }

  deleteField(index: number) {
    this.fieldCrtls.removeAt(index);
  }

  getFieldCtrl(index: number, name: string): FormControl {
    return this.fieldCrtls.get(index.toString()).get(name) as FormControl;
  }

  onFieldTypeChange(fieldTypeCtrl: FormControl) {
    fieldTypeCtrl.valueChanges.subscribe(val => {
      console.log(val);
    })
  }

}


 // let a = this.formCtrl.get("fields").get("0") as FormGroup;
    // console.log("1", a.get("test"));
    // a.addControl('test', this.fb.control(''));
    // console.log("2", a.get("test"));