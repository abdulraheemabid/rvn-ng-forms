import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FieldTypeEnum, IForm, IId } from '../../rvn-forms/types';

@Injectable({
  providedIn: 'root'
})
export class FormApiService {

  constructor(private httpClient: HttpClient) { }

  baseUrl: string = environment.restBaseUrl;

  getForm(id: number) {
    return this.httpClient.get<IForm>(`${this.baseUrl}/${id}`);
  }

  getForms() {
    return this.httpClient.get<IForm[]>(this.baseUrl);
  }

  createForm(form: IForm) {
    form = this.transformFieldsTypeToString(form);
    return this.httpClient.post<IId>(this.baseUrl, form);
  }

  editForm(form: IForm) {
    return this.httpClient.patch<IId>(`${this.baseUrl}/${form.id}`, form);
  }

  deleteForm(id: number) {
    return this.httpClient.delete<IId>(`${this.baseUrl}/${id}`);
  }


  private transformFieldsTypeToString(form: IForm) {
    form.fields.forEach(f => {
      f.type = f.type.key.toLowerCase() as any;
    });
    return form;
  }


}
