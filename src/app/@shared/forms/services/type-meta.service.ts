import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { IFieldTypeMeta } from '../types';
import { fieldTypeMetaData } from './field-type-metadata';

@Injectable({
  providedIn: 'root'
})
export class TypeMetaService {

  constructor() { }

  fieldTypeMeta = fieldTypeMetaData;

  getFieldTypes(): KeyValue<string, string>[] {
    let result = [];

    this.fieldTypeMeta.forEach((value: IFieldTypeMeta, key: string) => {
      result.push(
        {
          key,
          value: value.typeDisplayName
        })
    });

    return result;
  }

  getFieldTypeMetaData(fieldType: string | KeyValue<string, string>): IFieldTypeMeta {
    if (typeof fieldType !== "string") fieldType = fieldType.key;
    fieldType = fieldType.toUpperCase();
    return this.fieldTypeMeta.get(fieldType);
  }
}



