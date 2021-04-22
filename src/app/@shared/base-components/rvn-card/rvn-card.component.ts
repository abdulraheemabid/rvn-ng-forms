import { Component, Input, OnInit } from '@angular/core';
import { RvnCardInput } from './rvn-card.input';

@Component({
  selector: 'rvn-card',
  templateUrl: './rvn-card.component.html',
  styleUrls: ['./rvn-card.component.scss']
})
export class RvnCardComponent implements OnInit {

  @Input() params: RvnCardInput;

  ngOnInit(): void {
  }

}
