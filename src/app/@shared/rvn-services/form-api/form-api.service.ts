import { Injectable } from '@angular/core';
import { IForm } from '../../rvn-forms/types';

@Injectable({
  providedIn: 'root'
})
export class FormApiService {

  constructor() { }

  getForm(){}

  getForms(id: number){}
  
  createForm(form: IForm){}

  editForm(form: IForm){}

  deleteForm(id: number){}

  
}
