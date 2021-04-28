import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RvnRadioInput } from 'src/app/@shared/base-components/rvn-radio/rvn-radio.input';
import { RvnSelectInput } from 'src/app/@shared/base-components/rvn-select/rvn-select.input';
import { RvnToggleInput } from 'src/app/@shared/base-components/rvn-toggle/rvn-toggle.input';
import { UIControlEnum } from '../../types';
import { BaseValueRendererComponent } from '../base-value-renderer/base-value-renderer.component';

@Component({
  selector: 'bool-value-renderer',
  templateUrl: './bool-value-renderer.component.html',
  styleUrls: ['./bool-value-renderer.component.scss']
})
export class BoolValueRendererComponent extends BaseValueRendererComponent implements OnInit {

  params: any;

  ngOnInit(): void {

    this.params = {
      label: this.fieldDefinition.name,
      placeholder: "Enter number",
      required: this.fieldDefinition.required
    }

    switch (this.UIControl) {
      case UIControlEnum.RADIO:
        this.params.radioOptions = [
          { key: true, value: "Yes" },
          { key: false, value: "No" },
        ]
        break;
      case UIControlEnum.SELECT:
        this.params.selectOptions = [
          { key: true, value: "Yes" },
          { key: false, value: "No" },
        ]
        break;
    }

  }
}
