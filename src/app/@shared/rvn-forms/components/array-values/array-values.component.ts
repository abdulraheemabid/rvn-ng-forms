import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RvnChipsInputInput } from 'src/app/@shared/rvn-core/components/rvn-chips-input/rvn-chips-input.input';
import { ArrayValuesInput } from './array-values.input';

@Component({
  selector: 'array-values',
  templateUrl: './array-values.component.html',
  styleUrls: ['./array-values.component.scss']
})
export class ArrayValuesComponent implements OnInit {

  constructor() { }

  @Input() config: ArrayValuesInput;
  
  chipsCompConfig: RvnChipsInputInput = { label: 'Options', placeholder: 'Type an option, press enter for next', required: true };

  ngOnInit(): void {
  }

}
