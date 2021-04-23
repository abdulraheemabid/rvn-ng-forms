import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { FieldTypeEnum, UIControlNameEnum } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class RvnFormService {
  constructor() { }

  private fieldTypeUIOptions = new Map<string, UIControlNameEnum[]>([
    ["FLOAT", [UIControlNameEnum.NUMBERINPUT]],
    ["INT", [UIControlNameEnum.NUMBERINPUT]],
    ["STRING", [UIControlNameEnum.INPUT]],
    ["DATE", [UIControlNameEnum.INPUT, UIControlNameEnum.DATEPICKER, UIControlNameEnum.SELECT]],
    ["BOOL", [UIControlNameEnum.TOGGLE, UIControlNameEnum.RADIO, UIControlNameEnum.SELECT]],
    ["MULTISELECT", [UIControlNameEnum.CHECKBOX, UIControlNameEnum.CHIPSINPUT]],
    ["SINGLESELECT", [UIControlNameEnum.SELECT, UIControlNameEnum.RADIO]],
  ])

  getFieldTypeControlOptions(): Map<string, UIControlNameEnum[]> {
    return this.fieldTypeUIOptions;
  }

  getFieldTypes(): KeyValue<string, string>[] {
    let result = [];
    for (const key in FieldTypeEnum) {
      result.push(
        {
          key,
          value: FieldTypeEnum[key]
        })
    }
    return result;
  }
}
