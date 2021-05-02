import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { isNullOrUndefined } from '../../rvn-core/utils/funtions.util';
import { TypeMetaService } from '../../rvn-forms/type-meta-service/type-meta.service';
import { IForm, IId, IRecord } from '../../rvn-forms/types';
import { FormDTO } from './form-api.dto';

@Injectable({
  providedIn: 'root'
})
export class FormApiService {

  constructor(private httpClient: HttpClient, private typeService: TypeMetaService) { }

  baseUrl: string = environment.restBaseUrl;

  getForm(id: number): Observable<IForm> {
    return this.httpClient.get<FormDTO>(`${this.baseUrl}/${id}`)
      .pipe(
        switchMap(form => of(this.transformFormFromDTO(form)))
      );
  }

  getForms() {
    return this.httpClient.get<IForm[]>(this.baseUrl);
  }

  createForm(form: IForm) {
    const dto = this.transformFormToDTO(form);
    return this.httpClient.post<IId>(this.baseUrl, dto);
  }

  updateForm(form: IForm) {
    const dto = this.transformFormToDTO(form);
    return this.httpClient.patch<IId>(`${this.baseUrl}/${form.id}`, dto);
  }

  deleteForm(id: number) {
    return this.httpClient.delete<IId>(`${this.baseUrl}/${id}`);
  }

  getRecord(formId: number, recordId: number): Observable<IRecord> {
    return this.httpClient.get<IRecord>(`${this.baseUrl}/${formId}/record/${recordId}`);
  }

  getRecords(formId: number): Observable<IRecord[]> {
    return this.httpClient.get<IRecord[]>(`${this.baseUrl}/${formId}/record`);
  }

  createRecord(formId: number, record: IRecord): Observable<IId> {
    const dto = this.transformRecordToDTO(record);
    return this.httpClient.post<IId>(`${this.baseUrl}/${formId}/record`, dto);
  }

  updateRecord(formId: number, record: IRecord): Observable<IId> {
    const dto = this.transformRecordToDTO(record);
    return this.httpClient.patch<IId>(`${this.baseUrl}/${formId}/record`, dto);
  }

  deleteRecord(formId: number, recordId: number): Observable<IId> {
    return this.httpClient.delete<IId>(`${this.baseUrl}/${formId}/record/${recordId}`);
  }


  private transformFormToDTO(form: IForm): FormDTO {
    return {
      id: form.id,
      name: form.name,
      attributes: form.attributes,
      fields: form.fields.map(f => {
        return {
          ...f,
          type: f.type.key,
          arrayValues: f.arrayValues?.map(v => v.value)
        }
      })
    };
  }

  private transformFormFromDTO(form: FormDTO): IForm {
    return {
      id: form.id,
      name: form.name,
      attributes: form.attributes,
      fields: form.fields.map(f => {
        const typeDisplayValue = this.typeService.getFieldTypes().find(ft => ft.key === f.type).value;
        return {
          ...f,
          attributes: f.attributes as any,
          arrayValues: f.arrayValues?.map(v => { return { "key": v, "value": v } as any }),
          type: { key: f.type, value: typeDisplayValue }
        }
      })
    }
  }

  private transformRecordToDTO(record: IRecord) {
    Object.keys(record.entry).forEach(key => {
      let value = record.entry[key];

      if (Array.isArray(value)) {
        value = value.map(item => {
          return this.isKeyValue(item) ? item.key : item;
        });
      } else {
        value = this.isKeyValue(value) ? value.key : value;
      }

      record.entry[key] = value;
    })

    return record;
  }

  private transformRecordFromDTO(form: IForm, record: IRecord) {

  }

  private isKeyValue(val: any) {
    return (
      typeof val === "object" &&
      !Array.isArray(val) &&
      Object.keys(val).length === 2 &&
      !isNullOrUndefined(val.key) &&
      !isNullOrUndefined(val.value)
    )
  }
}
