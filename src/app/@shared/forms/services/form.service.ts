import { KeyValue } from '@angular/common';
import { Injectable, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { DynamicComponentService } from '../../services/dynamic-component/dynamic-component.service';
import { TypeMetaService } from './type-meta.service';


@Injectable({
  providedIn: 'root'
})
export class RvnFormService {

  constructor(private typeMetaService: TypeMetaService, private dynamicComponentService: DynamicComponentService) { }

  injectTypeRenderer(type: KeyValue<string, string>, viewContainerRef: ViewContainerRef, fieldFormGroup: FormGroup): Observable<boolean> {
    const componentToRender = this.typeMetaService.getFieldTypeMetaData(type)?.definitionRenderer;

    if (!componentToRender) return new Observable<boolean>(sub => sub.error());

    const inputs: KeyValue<string, any>[] = [{ key: "fieldFG", value: fieldFormGroup }, { key: "selectedType", value: type.key }]

    return this.dynamicComponentService.injectComponent(viewContainerRef, componentToRender, inputs);

  }

}
