import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { RvnAccordionInput } from './rvn-accordion.input';

@Component({
  selector: 'rvn-accordion',
  templateUrl: './rvn-accordion.component.html',
  styleUrls: ['./rvn-accordion.component.scss']
})
export class RvnAccordionComponent implements OnInit {

  constructor() { }

  @Input() params: RvnAccordionInput;

  ngOnInit(): void {
    if (isNullOrUndefined(this.params)) this.params = {};
    if (isNullOrUndefined(this.params?.multi)) this.params.multi = true;
  }
}
