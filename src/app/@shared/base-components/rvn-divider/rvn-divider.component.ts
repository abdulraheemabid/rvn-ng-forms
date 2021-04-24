import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { RvnDividerInput } from './rvn-divider.input';

@Component({
  selector: 'rvn-divider',
  templateUrl: './rvn-divider.component.html',
  styleUrls: ['./rvn-divider.component.scss']
})
export class RvnDividerComponent implements OnInit {

  @Input() params: RvnDividerInput;
  customWidthProvided: boolean = false;

  ngOnInit(): void {
    if (isNullOrUndefined(this.params)) this.params = {};
    if (isNullOrUndefined(this.params?.inset)) this.params.inset = false;
    if (isNullOrUndefined(this.params?.vertical)) this.params.vertical = false;
    if (!isNullOrUndefined(this.params?.width)) this.customWidthProvided = true;
    if (isNullOrUndefined(this.params?.width)) this.params.width = "100%";


  }

}
