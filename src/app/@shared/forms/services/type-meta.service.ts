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

  getFieldTypeMetaData(field: string | KeyValue<string, string>): IFieldTypeMeta {
    if (typeof field !== "string") field = field.key;
    field = field.toUpperCase();
    return this.fieldTypeMeta.get(field);
  }
}



