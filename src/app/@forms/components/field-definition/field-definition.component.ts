import { KeyValue } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RvnInputInput } from 'src/app/@shared/rvn-core/components/rvn-input/rvn-input.input';
import { RvnSelectInput } from 'src/app/@shared/rvn-core/components/rvn-select/rvn-select.input';
import { RvnToggleInput } from 'src/app/@shared/rvn-core/components/rvn-toggle/rvn-toggle.input';
import { FormService } from 'src/app/@shared/rvn-services/form/form.service';
import { TypeMetaService } from 'src/app/@shared/rvn-forms/type-meta-service/type-meta.service';
import { isNullOrUndefined } from 'src/app/@shared/rvn-core/utils/funtions.util';
import { FieldType } from 'src/app/@shared/rvn-forms/types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'field-definition',
  templateUrl: './field-definition.component.html',
  styleUrls: ['./field-definition.component.scss']
})
export class FieldDefinitionComponent implements OnInit {

  constructor(private formService: FormService, private typeMetaService: TypeMetaService) { }

  //fieldFG should contain type, name and required formControls already
  @Input() fieldFG: any;
  @ViewChild("rendererAnchorPoint", { read: ViewContainerRef }) rendererAnchorPoint: ViewContainerRef;
  fieldNameCompParams: RvnInputInput = { label: 'Name', placeholder: 'Minimum 3 characters', required: true };
  fieldTypeCompParams: RvnSelectInput = { label: 'Type', placeholder: 'Select', required: true, selectOptions: null };
  fieldRequiredCompParams: RvnToggleInput = { label: "Required", required: false };
  typeRenderer: any;


  ngOnInit(): void {
    this.initUICompParams();

    let fieldTypeFC = this.fieldFG.get('type') as FormControl;
    let fieldTypeValue = fieldTypeFC.value;

    this.onFieldTypeChange(fieldTypeFC);

    if (!isNullOrUndefined(fieldTypeValue) && fieldTypeValue !== "") {
      setTimeout(() => {
        const fielTypKeyValue = this.fieldTypeCompParams.selectOptions.find(o => o.key === fieldTypeValue.key);
        fieldTypeFC.setValue(fielTypKeyValue, { emitEvent: false });
        this.loadTypeRenderer(fielTypKeyValue);
      })
    }
  }

  getCtrlByName(name: string): FormControl {
    return this.fieldFG.get(name) as FormControl;
  }

  initUICompParams() {
    this.fieldTypeCompParams.selectOptions = this.typeMetaService.getFieldTypes();
  }

  onFieldTypeChange(fieldTypeCtrl: FormControl) {
    fieldTypeCtrl.valueChanges
      .pipe(
        map(v => {
          if (this.fieldFG.get("attributes").get("displayAs") !== null)
            (this.fieldFG.get("attributes") as FormGroup).removeControl("displayAs");

          if (this.fieldFG.get("arrayValues") !== null)
            this.fieldFG.removeControl("arrayValues");

          return v;
        })
      )
      .subscribe((val: KeyValue<FieldType, string>) => {
        this.loadTypeRenderer(val);
      })
  }

  loadTypeRenderer(type: KeyValue<FieldType, string>) {
    this.formService.injectTypeDefinitionRenderer(type, this.rendererAnchorPoint, this.fieldFG).subscribe();
  }

}
