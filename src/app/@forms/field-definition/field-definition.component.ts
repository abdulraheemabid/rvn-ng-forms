import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RvnSelectInput } from 'src/app/@shared/base-components/rvn-select/rvn-select.input';
import { RvnFormService } from 'src/app/@shared/forms/form.service';
import { UIControlNameEnum } from 'src/app/@shared/forms/interfaces';

@Component({
  selector: 'field-definition',
  templateUrl: './field-definition.component.html',
  styleUrls: ['./field-definition.component.scss']
})
export class FieldDefinitionComponent implements OnInit {

  constructor(private sharedFormService: RvnFormService,) { }

  //fieldFG should contain type and name formControls already
  @Input() fieldFG: any;
  fieldTypeCompParams: RvnSelectInput = { label: 'Type', placeholder: 'Select', required: true, selectOptions: null, 'styleVersion': 'v2' };
  displayAsCompParams: RvnSelectInput = { label: 'Dsiplay as', placeholder: 'Select', required: true, selectOptions: null, 'styleVersion': 'v2' };
  fieldTypeUIControlMappings: Map<string, UIControlNameEnum[]>;


  ngOnInit(): void {
    this.initUICompParams();
    this.onFieldTypeChange(this.fieldFG.get('type') as FormControl);
  }

  getCtrlByName(name: string): FormControl {
    return this.fieldFG.get(name) as FormControl;
  }

  initUICompParams() {
    this.fieldTypeCompParams.selectOptions = this.sharedFormService.getFieldTypes();
    this.fieldTypeUIControlMappings = this.sharedFormService.getFieldTypeControlOptions();
  }

  onFieldTypeChange(fieldTypeCtrl: FormControl) {
    fieldTypeCtrl.valueChanges.subscribe(val => {
      console.log(val);
    })
  }

}
