import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TypeMetaService } from '../../rvn-forms/type-meta-service/type-meta.service';
import { IForm, IId } from '../../rvn-forms/types';
import { FormDTO } from './form-api.dto';

@Injectable({
  providedIn: 'root'
})
export class FormApiService {

  constructor(private httpClient: HttpClient, private typeService: TypeMetaService) { }

  baseUrl: string = environment.restBaseUrl;

  getForm(id: number) {
    return this.httpClient.get<FormDTO>(`${this.baseUrl}/${id}`)
      .pipe(
        switchMap(form => of(this.transformFromDTO(form)))
      );
  }

  getForms() {
    return this.httpClient.get<IForm[]>(this.baseUrl);
  }

  createForm(form: IForm) {
    const dto = this.transformToDTO(form);
    return this.httpClient.post<IId>(this.baseUrl, dto);
  }

  editForm(form: IForm) {
    return this.httpClient.patch<IId>(`${this.baseUrl}/${form.id}`, form);
  }

  deleteForm(id: number) {
    return this.httpClient.delete<IId>(`${this.baseUrl}/${id}`);
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
          arrayValues: f.arrayValues.map(v => v.value)
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
          arrayValues: f.arrayValues.map(v => { return { "key": v, "value": v } as any }),
          type: { key: f.type, value: typeDisplayValue }
        }
      })
    }
  }


}
