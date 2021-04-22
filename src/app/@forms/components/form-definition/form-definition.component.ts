import { Component, OnInit } from '@angular/core';
import { IForm } from 'src/app/@shared/forms/interfaces';

@Component({
  selector: 'form-definition',
  templateUrl: './form-definition.component.html',
  styleUrls: ['./form-definition.component.scss']
})
export class FormDefinitionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  form: IForm = {
    name: null,
    fields: [{
      name: null,
      required: null,
      type: null
    }]
  }

}
