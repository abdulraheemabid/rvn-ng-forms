import { KeyValue } from '@angular/common';
import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RvnInputInput } from 'src/app/@shared/base-components/rvn-input/rvn-input.input';
import { RvnSelectInput } from 'src/app/@shared/base-components/rvn-select/rvn-select.input';
import { RvnFormService } from 'src/app/@shared/forms/services/form.service';
import { FieldTypeEnum, UIControlNameEnum } from 'src/app/@shared/forms/types';

@Component({
  selector: 'field-definition',
  templateUrl: './field-definition.component.html',
  styleUrls: ['./field-definition.component.scss']
})
export class FieldDefinitionComponent implements OnInit {

  constructor(private sharedFormService: RvnFormService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  //fieldFG should contain type and name formControls already
  @Input() fieldFG: any;
  @ViewChild("rendererAnchorPoint", { read: ViewContainerRef }) rendererAnchorPoint: any;
  fieldNameCompParams: RvnInputInput = { label: 'Name', placeholder: 'Minimum 3 characters', styleVersion: 'v2', required: true };
  fieldTypeCompParams: RvnSelectInput = { label: 'Type', placeholder: 'Select', required: true, selectOptions: null, 'styleVersion': 'v2' };
  displayAsCompParams: RvnSelectInput = { label: 'Dsiplay as', placeholder: 'Select', required: true, selectOptions: null, 'styleVersion': 'v2' };
  typeRenderer: any;


  ngOnInit(): void {
    this.initUICompParams();
    this.onFieldTypeChange(this.fieldFG.get('type') as FormControl);
  }

  getCtrlByName(name: string): FormControl {
    return this.fieldFG.get(name) as FormControl;
  }

  initUICompParams() {
    this.fieldTypeCompParams.selectOptions = this.sharedFormService.getFieldTypes();
  }

  onFieldTypeChange(fieldTypeCtrl: FormControl) {
    fieldTypeCtrl.valueChanges.subscribe((val: KeyValue<string, string>) => {
      this.loadTypeRenderer(val);
    })
  }

  loadTypeRenderer(type: KeyValue<string, string>) {
    const componentToRender = this.sharedFormService.getFieldTypeMetaData(type)?.definitionRenderer;
    if (componentToRender) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentToRender);
      this.rendererAnchorPoint.clear();
      const componentRef = this.rendererAnchorPoint.createComponent(componentFactory);
      componentRef.instance.name = "name";
    }
  }



}
