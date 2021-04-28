import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { RvnListInput } from './rvn-list.input';

@Component({
  selector: 'rvn-list',
  templateUrl: './rvn-list.component.html',
  styleUrls: ['./rvn-list.component.scss']
})
export class RvnListComponent implements OnInit {

  constructor() { }

  @Input() params: RvnListInput;

  ngOnInit(): void {
    if (isNullOrUndefined(this.params)) this.params = { list: [], lineOneKey: "" };
    if (isNullOrUndefined(this.params.list)) this.params.list = [];
    if (isNullOrUndefined(this.params.lineOneKey)) this.params.lineOneKey = "";
    if (isNullOrUndefined(this.params.dense)) this.params.dense = false;
  }
}
