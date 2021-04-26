import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { fieldTypeMetaData } from '../field-type-metadata';
import { IFieldTypeMeta } from '../types';

@Injectable({
  providedIn: 'root'
})
export class RvnFormService {

  constructor() { }

  getFieldTypes(): KeyValue<string, string>[] {
    let result = [];

    fieldTypeMetaData.forEach((value: IFieldTypeMeta, key: string) => {
      result.push(
        {
          key,
          value: value.typeDisplayName
        })
    });

    return result;
  }

  getFieldTypeMetaData(field: string | KeyValue<string, string>): IFieldTypeMeta {
    if (typeof field !== "string") field = field.key;
    field = field.toUpperCase();
    return fieldTypeMetaData.get(field);
  }

}
