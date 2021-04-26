import { KeyValue } from '@angular/common';
import { Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RvnInputInput } from 'src/app/@shared/base-components/rvn-input/rvn-input.input';
import { RvnSelectInput } from 'src/app/@shared/base-components/rvn-select/rvn-select.input';
import { RvnToggleInput } from 'src/app/@shared/base-components/rvn-toggle/rvn-toggle.input';
import { RvnFormService } from 'src/app/@shared/forms/services/form.service';
import { TypeMetaService } from 'src/app/@shared/forms/services/type-meta.service';

@Component({
  selector: 'field-definition',
  templateUrl: './field-definition.component.html',
  styleUrls: ['./field-definition.component.scss']
})
export class FieldDefinitionComponent implements OnInit {

  constructor(private formService: RvnFormService, private typeMetaService: TypeMetaService) { }

  //fieldFG should contain type, name and required formControls already
  @Input() fieldFG: any;
  @ViewChild("rendererAnchorPoint", { read: ViewContainerRef }) rendererAnchorPoint: ViewContainerRef;
  fieldNameCompParams: RvnInputInput = { label: 'Name', placeholder: 'Minimum 3 characters', required: true };
  fieldTypeCompParams: RvnSelectInput = { label: 'Type', placeholder: 'Select', required: true, selectOptions: null };
  fieldRequiredCompParams: RvnToggleInput = { label: "Required", required: false };
  typeRenderer: any;


  ngOnInit(): void {
    this.initUICompParams();
    this.onFieldTypeChange(this.fieldFG.get('type') as FormControl);
  }

  getCtrlByName(name: string): FormControl {
    return this.fieldFG.get(name) as FormControl;
  }

  initUICompParams() {
    this.fieldTypeCompParams.selectOptions = this.typeMetaService.getFieldTypes();
  }

  onFieldTypeChange(fieldTypeCtrl: FormControl) {
    fieldTypeCtrl.valueChanges.subscribe((val: KeyValue<string, string>) => {
      this.loadTypeRenderer(val);
    })
  }

  loadTypeRenderer(type: KeyValue<string, string>) {
    this.formService.injectTypeDefinitionRenderer(type, this.rendererAnchorPoint, this.fieldFG).subscribe();
  }

}
