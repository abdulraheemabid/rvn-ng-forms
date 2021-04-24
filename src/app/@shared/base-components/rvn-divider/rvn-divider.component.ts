import { Component, Input, OnInit } from '@angular/core';
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
    if (!this.params) this.params = {};
    if (!this.params?.inset) this.params.inset = false;
    if (!this.params?.vertical) this.params.vertical = false;
    if (this.params?.width) this.customWidthProvided = true;
    if (!this.params?.width) this.params.width = "100%";


  }

}
