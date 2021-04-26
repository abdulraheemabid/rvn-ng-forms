import { KeyValue } from '@angular/common';
import { Injectable, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicComponentService } from '../../services/dynamic-component/dynamic-component.service';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { IFormField } from '../types';
import { TypeMetaService } from './type-meta.service';


@Injectable({
  providedIn: 'root'
})
export class RvnFormService {

  constructor(private typeMetaService: TypeMetaService, private dynamicComponentService: DynamicComponentService) { }

  injectTypeDefinitionRenderer(type: KeyValue<string, string>, viewContainerRef: ViewContainerRef, fieldFormGroup: FormGroup): Observable<boolean> {

    const componentToRender = this.typeMetaService.getFieldTypeMetaData(type)?.definitionRenderer;

    if (!componentToRender) return new Observable<boolean>(sub => sub.error());

    const inputs: KeyValue<string, any>[] = [{ key: "fieldFG", value: fieldFormGroup }, { key: "selectedType", value: type.key }]

    return this.dynamicComponentService.injectComponent(viewContainerRef, componentToRender, inputs);

  }

  injectTypeValueRenderer(field: IFormField, viewContainerRef: ViewContainerRef): Observable<boolean> {

    let typeMeta = this.typeMetaService.getFieldTypeMetaData(field.type);
    let componentToRender;

    if (typeMeta.valueRenderers.length === 1) {
      componentToRender = typeMeta.valueRenderers[0].renderer
    } else {
      if (!isNullOrUndefined(field.attributes?.displayAs?.key))
        componentToRender = typeMeta.valueRenderers.filter(r => r.UIControl === field.attributes.displayAs.key)[0].renderer;
    }

    return this.dynamicComponentService.injectComponent(viewContainerRef, componentToRender, []);

  }

}
