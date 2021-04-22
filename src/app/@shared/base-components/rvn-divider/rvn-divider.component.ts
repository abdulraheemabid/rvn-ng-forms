import { Component, Input, OnInit } from '@angular/core';
import { RvnDividerInput } from './rvn-divider.input';

@Component({
  selector: 'rvn-divider',
  templateUrl: './rvn-divider.component.html',
  styleUrls: ['./rvn-divider.component.scss']
})
export class RvnDividerComponent implements OnInit {

  @Input() params: RvnDividerInput;

  ngOnInit(): void {
    if(this.params?.inset) this.params.inset = false;
    if(this.params?.vertical) this.params.vertical = false;
  }

}
