import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RvnSelectInput } from 'src/app/@shared/rvn-core/components/rvn-select/rvn-select.input';
import { TypeMetaService } from 'src/app/@shared/rvn-forms/type-meta-service/type-meta.service';
import { isNullOrUndefined } from 'src/app/@shared/rvn-core/utils/funtions.util';
import { UIControlNameEnum, UIControlEnum, FieldType } from '../../types';

@Component({
  selector: 'choose-ui-control',
  templateUrl: './choose-ui-control.component.html',
  styleUrls: ['./choose-ui-control.component.scss']
})
export class ChooseUiControlComponent implements OnInit {

  constructor(private typeMetaService: TypeMetaService) { }

  @Input() selectedFieldType: FieldType;
  @Input() uiFormControl: FormControl;

  selectCompParams: RvnSelectInput = { label: 'Display as', placeholder: 'Select', required: true, selectOptions: null };

  ngOnInit(): void {
    if (this.selectedFieldType) {
      const supportedControls: UIControlEnum[] = this.typeMetaService.getFieldTypeMetaData(this.selectedFieldType)?.valueRenderers.map(i => i.UIControl);

      let selectOptions: KeyValue<string, string>[] = [];
      for (let key of supportedControls) {
        selectOptions.push({
          key,
          value: UIControlNameEnum[key]
        });
      }

      this.selectCompParams.selectOptions = selectOptions;

      if (!isNullOrUndefined(this.uiFormControl.value) && this.uiFormControl.value !== "")
        this.uiFormControl.setValue(selectOptions.find(o => o.key === this.uiFormControl.value.key), {emitEvent: false});

    }
  }
}
