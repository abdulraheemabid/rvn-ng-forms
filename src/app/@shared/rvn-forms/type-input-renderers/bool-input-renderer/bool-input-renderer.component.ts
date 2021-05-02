import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RvnRadioInput } from 'src/app/@shared/rvn-core/components/rvn-radio/rvn-radio.input';
import { RvnSelectInput } from 'src/app/@shared/rvn-core/components/rvn-select/rvn-select.input';
import { RvnToggleInput } from 'src/app/@shared/rvn-core/components/rvn-toggle/rvn-toggle.input';
import { UIControlEnum } from '../../types';
import { BaseInputRendererComponent } from '../base-input-renderer/base-input-renderer.component';

@Component({
  selector: 'bool-input-renderer',
  templateUrl: './bool-input-renderer.component.html',
  styleUrls: ['./bool-input-renderer.component.scss']
})
export class BoolInputRendererComponent extends BaseInputRendererComponent implements OnInit {

  config: any;

  ngOnInit(): void {

    this.config = {
      label: this.fieldDefinition.name,
      placeholder: "Enter number",
      required: this.fieldDefinition.required
    }

    switch (this.UIControl) {
      case UIControlEnum.RADIO:
        this.config.radioOptions = [
          { key: true, value: "Yes" },
          { key: false, value: "No" },
        ]
        break;
      case UIControlEnum.SELECT:
        this.config.selectOptions = [
          { key: true, value: "Yes" },
          { key: false, value: "No" },
        ]
        break;
    }

  }
}
