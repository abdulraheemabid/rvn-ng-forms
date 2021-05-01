import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
    // return this.httpClient.get<FormDTO>(`${this.baseUrl}/${id}`)
    //   .pipe(
    //     switchMap(form => of(this.transformFromDTO(form)))
    //   );

    return of({ "id": 17, "createdOn": "2021-04-30T22:39:38.633Z", "createdById": 1, "updatedOn": "2021-04-30T22:39:38.633Z", "updatedById": 1, "deletedOn": null, "attributes": {}, "name": "test", "fields": [{ "id": 36, "createdOn": "2021-04-30T22:39:38.627Z", "createdById": 1, "updatedOn": "2021-04-30T22:39:38.627Z", "updatedById": null, "deletedOn": null, "attributes": { "position": 0, "_expanded": true }, "name": "111", "type": { "key": "string", "value": "Text" }, "required": true, "validationRegex": null, "arrayValues": null }] });
  }

  getForms() {
    return this.httpClient.get<IForm[]>(this.baseUrl);
  }

  createForm(form: IForm) {
    const dto = this.transformToDTO(form);
    return this.httpClient.post<IId>(this.baseUrl, dto);
  }

  updateForm(form: IForm) {
    const dto = this.transformToDTO(form);
    return this.httpClient.patch<IId>(`${this.baseUrl}/${form.id}`, dto);
  }

  deleteForm(id: number) {
    return this.httpClient.delete<IId>(`${this.baseUrl}/${id}`);
  }

  getRecord(formId: number, recordId: number): Observable<IRecord> {
    return this.httpClient.get<IRecord>(`${this.baseUrl}/${formId}/record/${recordId}`);
  }

  getRecords(formId: number): Observable<IRecord[]> {
    //return this.httpClient.get<IRecord[]>(`${this.baseUrl}/${formId}/record`);
    return of([{ "id": 2, "createdOn": "2021-04-30T22:41:04.794Z", "createdById": 1, "updatedOn": "2021-04-30T22:41:04.794Z", "updatedById": null, "deletedOn": null, "attributes": null, "entry": { "36": "1" } }, { "id": 3, "createdOn": "2021-04-30T22:41:09.617Z", "createdById": 1, "updatedOn": "2021-04-30T22:41:09.617Z", "updatedById": null, "deletedOn": null, "attributes": null, "entry": { "36": "2" } }, { "id": 4, "createdOn": "2021-04-30T22:41:14.720Z", "createdById": 1, "updatedOn": "2021-04-30T22:41:14.720Z", "updatedById": null, "deletedOn": null, "attributes": null, "entry": { "36": "3" } }, { "id": 5, "createdOn": "2021-04-30T22:41:18.745Z", "createdById": 1, "updatedOn": "2021-04-30T22:41:18.745Z", "updatedById": null, "deletedOn": null, "attributes": null, "entry": { "36": "4" } }]);
  }

  createRecord(formId: number, record: IRecord): Observable<IId> {
    return this.httpClient.post<IId>(`${this.baseUrl}/${formId}/record`, record);
  }

  updateRecord(formId: number, record: IRecord): Observable<IId> {
    return this.httpClient.patch<IId>(`${this.baseUrl}/${formId}/record`, record);
  }

  deleteRecord(formId: number, recordId: number): Observable<IId> {
    return this.httpClient.delete<IId>(`${this.baseUrl}/${formId}/record/${recordId}`);
  }


  private transformToDTO(form: IForm): FormDTO {
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

  private transformFromDTO(form: FormDTO): IForm {
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


}
