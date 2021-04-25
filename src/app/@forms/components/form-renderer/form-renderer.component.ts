import { Component, Input, OnInit } from '@angular/core';
import { IForm } from 'src/app/@shared/forms/types';

@Component({
  selector: 'form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss']
})
export class FormRendererComponent implements OnInit {

  constructor() { }

  @Input() formDefinition: IForm;

  JSON = JSON;

  ngOnInit(): void {
  }

}
