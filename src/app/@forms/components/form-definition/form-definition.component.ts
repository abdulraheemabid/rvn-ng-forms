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

  panelOpenState = false;

  initDone: boolean = false;
  formCtrl: FormGroup;

  //UI control params
  formNameCompParam: RvnInputInput = { label: 'Name', placeholder: 'Minimum 3 characters', required: true };
  fieldAddCompParam: RvnButtonInput = { type: 'icon-text-secondary', icon: 'add' };
  deleteFieldCompParam: RvnButtonInput = { type: 'secondary' };


  get fieldFormGroupTemplate() {
    return { name: ['', [Validators.required, Validators.minLength(3)]], type: ['', Validators.required], required: [false] }
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
      formName: ['', [Validators.required, Validators.minLength(3)]],
      fields: this.fb.array([
        this.fb.group(this.fieldFormGroupTemplate)
      ])
    });

    this.formCtrl.valueChanges.subscribe(val => console.log(val));
  }

  addField() {
    let fg = this.fb.group(this.fieldFormGroupTemplate);
    this.fieldGroups.insert(0, fg);
  }

  deleteField(index: number) {
    if (this.fieldGroups.length > 1)
      this.fieldGroups.removeAt(index);
  }

  drop(event) {
    let control = this.fieldGroups.controls.splice(event.previousIndex, 1)[0];
    this.fieldGroups.controls.splice(event.currentIndex, 0, control);
    //moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}


 // let a = this.formCtrl.get("fields").get("0") as FormGroup;
    // console.log("1", a.get("test"));
    // a.addControl('test', this.fb.control(''));
    // console.log("2", a.get("test"));