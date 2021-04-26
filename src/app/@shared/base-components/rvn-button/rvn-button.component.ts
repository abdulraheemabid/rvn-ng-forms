import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { RvnButtonInput } from './rvn-button.input';

@Component({
  selector: 'rvn-button',
  templateUrl: './rvn-button.component.html',
  styleUrls: ['./rvn-button.component.scss']
})
export class RvnButtonComponent implements OnInit {

  @Input() params: RvnButtonInput;
  @Input() disabled: boolean;
  @Output() onClick = new EventEmitter();

  ngOnInit(): void {
    if (isNullOrUndefined(this.params)) this.params = {};
    if (isNullOrUndefined(this.params?.type)) this.params.type = "primary";
    if (isNullOrUndefined(this.params?.btnClass)) this.params.btnClass = "";
    if (isNullOrUndefined(this.disabled)) this.disabled = false;
  }

  click(event: Event) {
    this.onClick.emit(event);
  }

}
