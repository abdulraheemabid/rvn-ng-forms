import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RvnSelectInput } from 'src/app/@shared/base-components/rvn-select/rvn-select.input';
import { RvnFormService } from '../../services/form.service';
import { UIControlNameEnum, UIControlEnum } from '../../types';

@Component({
  selector: 'choose-ui-control',
  templateUrl: './choose-ui-control.component.html',
  styleUrls: ['./choose-ui-control.component.scss']
})
export class ChooseUiControlComponent implements OnInit {

  constructor(private sharedFormService: RvnFormService) { }

  @Input() selectedFieldType: string;
  @Input() uiFormControl: FormControl;

  selectCompParams: RvnSelectInput = { label: 'Display as', placeholder: 'Select', required: true, selectOptions: null };

  ngOnInit(): void {
    if (this.selectedFieldType) {
      const supportedControls: UIControlEnum[] = this.sharedFormService.getFieldTypeMetaData(this.selectedFieldType)?.valueRenderer.map(i => i.UIControl);

      let selectOptions: KeyValue<string, string>[] = [];
      for (let key of supportedControls) {
        selectOptions.push({
          key,
          value: UIControlNameEnum[key]
        });
      }

      this.selectCompParams.selectOptions = selectOptions;
    }
  }

}
