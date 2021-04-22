import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    if (!this.params) this.params = {};
    if (!this.params?.color) this.params.color = "primary";
    if (!this.params?.type) this.params.type = "primary";
    if (!this.disabled) this.disabled = false;
  }

  click(event: Event) {
    this.onClick.emit(event);
  }

}
