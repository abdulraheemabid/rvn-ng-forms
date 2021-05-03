import { Component, Input, OnInit } from '@angular/core';
import { IForm, IRecord } from 'src/app/@shared/rvn-forms/types';

@Component({
  selector: 'record-view',
  templateUrl: './record-view.component.html',
  styleUrls: ['./record-view.component.scss']
})
export class RecordViewComponent implements OnInit {

  constructor() { }

  @Input() form: IForm;
  @Input() record: IRecord;

  ngOnInit(): void {
  }

}
