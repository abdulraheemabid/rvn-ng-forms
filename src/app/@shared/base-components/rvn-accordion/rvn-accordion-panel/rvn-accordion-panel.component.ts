import { Component, Input, OnInit } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { isNullOrUndefined } from 'src/app/@shared/utils/funtions.util';
import { RvnAccordionPanelInput } from './rvn-accordion-panel.input';

@Component({
  selector: 'rvn-accordion-panel',
  templateUrl: './rvn-accordion-panel.component.html',
  styleUrls: ['./rvn-accordion-panel.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class RvnAccordionPanelComponent implements OnInit {

  constructor() { }

  @Input() params: RvnAccordionPanelInput;

  ngOnInit(): void {
    if (isNullOrUndefined(this.params)) this.params = {};
    if (isNullOrUndefined(this.params?.hideToggle)) this.params.hideToggle = false;
    if (isNullOrUndefined(this.params?.hasActionContent)) this.params.hasActionContent = false;
    if (isNullOrUndefined(this.params?.hasHeader)) this.params.hasHeader = true;
    if (isNullOrUndefined(this.params?.disabled)) this.params.disabled = false;
    if (isNullOrUndefined(this.params?.expanded)) this.params.expanded = true;
  }

}
