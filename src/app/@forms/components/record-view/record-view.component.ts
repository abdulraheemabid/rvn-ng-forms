import { Component, Input, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { IForm, IFormField, IRecord } from 'src/app/@shared/rvn-forms/types';
import { FormService } from 'src/app/@shared/rvn-services/form/form.service';

@Component({
  selector: 'record-view',
  templateUrl: './record-view.component.html',
  styleUrls: ['./record-view.component.scss']
})
export class RecordViewComponent implements OnInit {

  constructor(private formService: FormService) { }

  @Input() form: IForm;
  @Input() record: IRecord;
  @ViewChildren("valueRendererAnchor", { read: ViewContainerRef }) valueRendererAnchor: QueryList<ViewContainerRef>;
  initDone: boolean = false;


  ngOnInit(): void {
    this.form.fields.sort((a, b) => a.attributes.position - b.attributes.position);

    setTimeout(() => {
      this.form.fields.forEach(field => {
        this.ingectValueRenderers(field, this.record.entry[field.id]);
      })
      this.initDone = true;
    });
  }

  ingectValueRenderers(field: IFormField, value: any) {
    const ref = this.valueRendererAnchor.get(field.attributes.position);
    this.formService.injectTypeValueRenderer(field.type.key, ref, value).subscribe(() => { }, err => { console.log(err) });
  }

}
