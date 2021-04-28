import { KeyValue } from '@angular/common';
import { Injectable, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicComponentService } from '../../services/dynamic-component/dynamic-component.service';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { IForm, IFormField } from '../types';
import { TypeMetaService } from './type-meta.service';


@Injectable({
  providedIn: 'root'
})
export class RvnFormService {

  constructor(private typeMetaService: TypeMetaService, private dynamicComponentService: DynamicComponentService, private fb: FormBuilder) { }

  injectTypeDefinitionRenderer(type: KeyValue<string, string>, viewContainerRef: ViewContainerRef, fieldFormGroup: FormGroup): Observable<boolean> {

    const componentToRender = this.typeMetaService.getFieldTypeMetaData(type)?.definitionRenderer;

    if (!componentToRender) return new Observable<boolean>(sub => sub.error("cant find componentToRender"));

    const inputs: KeyValue<string, any>[] = [{ key: "fieldFG", value: fieldFormGroup }, { key: "selectedType", value: type.key }]

    return this.dynamicComponentService.injectComponent(viewContainerRef, componentToRender, inputs);

  }

  injectTypeValueRenderer(field: IFormField, viewContainerRef: ViewContainerRef, valueFC: FormControl): Observable<boolean> {

    let typeMeta = this.typeMetaService.getFieldTypeMetaData(field.type);
    let rendererConfig;
    let componentToRender;

    if (typeMeta.valueRenderers.length === 1) rendererConfig = typeMeta.valueRenderers[0];
    else if (!isNullOrUndefined(field.attributes?.displayAs?.key)) rendererConfig = typeMeta.valueRenderers.filter(r => r.UIControl === field.attributes.displayAs.key)[0];
    else return new Observable<boolean>(sub => sub.error("field.attributes?.displayAs?.key not set"));

    componentToRender = rendererConfig.renderer;

    const input = [{ key: "UIControl", value: rendererConfig.UIControl }, { key: "valueFC", value: valueFC }, , { key: "fieldDefinition", value: field }];

    return this.dynamicComponentService.injectComponent(viewContainerRef, componentToRender, input);

  }

  generateRecordFormGroup(formDefinition: IForm, keyForFieldControlId: string = "id") {
    let recordFg = this.fb.group({});
    formDefinition.fields.forEach(f => {
      const validators = f.required ? [Validators.required] : [];
      recordFg.addControl(f[keyForFieldControlId].toString(), this.fb.control(null, validators));
    });
    return recordFg;
  }

}