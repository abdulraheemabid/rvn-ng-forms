import { KeyValue } from '@angular/common';
import { Injectable, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IFormField, IForm, FieldType, IRecord } from '../../rvn-forms/types';
import { TypeMetaService } from '../../rvn-forms/type-meta-service/type-meta.service';
import { DynamicComponentService } from '../dynamic-component/dynamic-component.service';
import { isNullOrUndefined } from '../../rvn-core/utils/funtions.util';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private typeMetaService: TypeMetaService, private dynamicComponentService: DynamicComponentService, private fb: FormBuilder) { }

  injectTypeDefinitionRenderer(type: KeyValue<FieldType, string>, viewContainerRef: ViewContainerRef, fieldFormGroup: FormGroup): Observable<boolean> {

    const componentToRender = this.typeMetaService.getFieldTypeMetaData(type)?.definitionRenderer;

    if (!componentToRender) return new Observable<boolean>(sub => sub.error("cant find componentToRender"));

    const inputs: KeyValue<string, any>[] = [{ key: "fieldFG", value: fieldFormGroup }, { key: "selectedType", value: type.key }]

    return this.dynamicComponentService.injectComponent(viewContainerRef, componentToRender, inputs);

  }

  injectTypeInputRenderer(field: IFormField, viewContainerRef: ViewContainerRef, valueFC: FormControl): Observable<boolean> {

    let typeMeta = this.typeMetaService.getFieldTypeMetaData(field.type);
    let rendererConfig;
    let componentToRender;

    if (typeMeta.inputRenderers.length === 1) rendererConfig = typeMeta.inputRenderers[0];
    else if (!isNullOrUndefined(field.attributes?.displayAs?.key)) rendererConfig = typeMeta.inputRenderers.filter(r => r.UIControl === field.attributes.displayAs.key)[0];
    else return new Observable<boolean>(sub => sub.error("field.attributes?.displayAs?.key not set"));

    componentToRender = rendererConfig.renderer;

    const input = [{ key: "UIControl", value: rendererConfig.UIControl }, { key: "valueFC", value: valueFC }, , { key: "fieldDefinition", value: field }];

    return this.dynamicComponentService.injectComponent(viewContainerRef, componentToRender, input);

  }

  injectTypeValueRenderer(fieldType: FieldType, viewContainerRef: ViewContainerRef, value: any): Observable<boolean> {

    let typeMeta = this.typeMetaService.getFieldTypeMetaData(fieldType);
    const rendererConfig = typeMeta.valueRenderers[0];
    const componentToRender = rendererConfig.renderer;
    const input = [{ key: "value", value }];

    return this.dynamicComponentService.injectComponent(viewContainerRef, componentToRender, input);

  }

  getNewRecordFG(formDefinition: IForm, keyForFieldControlId: string = "id") {
    let recordFg = this.fb.group({});
    formDefinition.fields.forEach(f => {
      if (f.markDeleted !== true) {
        const validators = f.required ? [Validators.required] : [];
        recordFg.addControl(f[keyForFieldControlId].toString(), this.fb.control(null, validators));
      }
    });
    return recordFg;
  }

  getRecordFG(formDefinition: IForm, record: IRecord) {
    let recordFg = this.fb.group({});
    formDefinition.fields.forEach(f => {
      if (f.markDeleted !== true) {
        const validators = f.required ? [Validators.required] : [];
        recordFg.addControl(f.id.toString(), this.fb.control(record.entry[f.id], validators));
      }
    });
    return recordFg;
  }

  getDefinitionFG(form: IForm) {
    let fg = this.fb.group({
      id: [form.id],
      attributes: [form.attributes],
      name: [form.name, [Validators.required, Validators.minLength(3)]],
      fields: this.fb.array([])
    });

    let fields = fg.get("fields") as FormArray;

    form.fields.forEach(fieldDef => {
      let fieldGrp = this.fb.group({
        id: [fieldDef.id],
        name: [fieldDef.name, [Validators.required, Validators.minLength(3)]],
        type: [fieldDef.type, Validators.required],
        required: [fieldDef.required],
        markDeleted: [false],
        attributes: this.fb.group({
          _expanded: [true],
          position: [null]
        })
      });

      if (typeof fieldDef.arrayValues !== "undefined") fieldGrp.addControl("arrayValues", this.fb.control(fieldDef.arrayValues));
      if (typeof fieldDef?.attributes?.position !== "undefined") fieldGrp.get("attributes").get("position").setValue(fieldDef.attributes.position);
      if (typeof fieldDef?.attributes?.displayAs !== "undefined") (fieldGrp.get("attributes") as FormGroup).addControl("displayAs", this.fb.control(fieldDef.attributes.displayAs));

      fields.push(fieldGrp);
    });

    return fg;

  }

  getNewDefinitionFG() {
    return this.fb.group({
      attributes: [{}],
      name: ['', [Validators.required, Validators.minLength(3)]],
      fields: this.fb.array([])
    })
  }

  getNewFieldFG() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', Validators.required],
      required: [false],
      attributes: this.fb.group({
        _expanded: [true],
        position: [null]
      })
    });
  }

}