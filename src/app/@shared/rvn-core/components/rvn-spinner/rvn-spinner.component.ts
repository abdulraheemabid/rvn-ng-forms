import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { RvnSpinnerInput } from './rvn-spinner.input';

@Component({
  selector: 'rvn-spinner',
  templateUrl: './rvn-spinner.component.html',
  styleUrls: ['./rvn-spinner.component.scss']
})
export class RvnSpinnerComponent implements OnInit {

  constructor() { }

  @Input() params: RvnSpinnerInput;

  ngOnInit(): void {
    if (isNullOrUndefined(this.params)) this.params = {};
    if (isNullOrUndefined(this.params.fullHeight)) this.params.fullHeight = false;
    if (isNullOrUndefined(this.params.color)) this.params.color = "primary";
  }

}
