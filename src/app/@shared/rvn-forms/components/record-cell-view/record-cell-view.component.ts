import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { IForm } from 'src/app/@shared/rvn-forms/types';
import { FormService } from 'src/app/@shared/rvn-services/form/form.service';

@Component({
  selector: 'record-cell-view',
  templateUrl: './record-cell-view.component.html',
  styleUrls: ['./record-cell-view.component.scss']
})
export class RecordCellViewComponent implements OnInit {

  constructor(private formService: FormService) { }

  @Input() fieldId: string;
  @Input() value: any;
  @Input() form: IForm;
  @ViewChild("anchor", { read: ViewContainerRef }) anchor: ViewContainerRef;

  ngOnInit(): void {
    setTimeout(() => {
      const fieldType = this.form.fields.find(f => f.id.toString() === this.fieldId).type.key;
      this.formService.injectTypeValueRenderer(fieldType, this.anchor, this.value).subscribe();
    })
  }

}
