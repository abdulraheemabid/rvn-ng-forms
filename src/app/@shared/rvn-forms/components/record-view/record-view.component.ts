import { Component, Input, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { isNullOrUndefined } from '@abdulraheemabid/rvn-pkg-ng-core';
import { IForm, IFormField, IRecord } from 'src/app/@shared/rvn-forms/types';
import { FormService } from 'src/app/@shared/rvn-forms/services/form/form.service';
import { RecordParentValueRendererInput } from '../../type-value-renderers/record-parent-value-renderer/record-parent-value-renderer.input';
import { RecordViewInput } from './record-view.input';

@Component({
  selector: 'record-view',
  templateUrl: './record-view.component.html',
  styleUrls: ['./record-view.component.scss']
})
export class RecordViewComponent implements OnInit {

  constructor(private formService: FormService) { }

  @Input() config: RecordViewInput;
  @ViewChildren("valueRendererAnchor", { read: ViewContainerRef }) valueRendererAnchor: QueryList<ViewContainerRef>;
  
  initDone: boolean = false;
  isChildForm: boolean;
  parentValueRendererConfig: RecordParentValueRendererInput;


  ngOnInit(): void {
    this.config?.form.fields.sort((a, b) => a.attributes.position - b.attributes.position);
    this.isChildForm = !isNullOrUndefined(this.config?.form?.attributes?.parentForm?.formId);
    this.parentValueRendererConfig = { form: this.config?.form, record: this.config?.record }
    setTimeout(() => {
      this.config?.form.fields.forEach(field => {
        this.ingectValueRenderers(field, this.config?.record.entry[field.id]);
      })
      this.initDone = true;
    });
  }

  ingectValueRenderers(field: IFormField, value: any) {
    const ref = this.valueRendererAnchor.get(field.attributes.position);
    this.formService.injectTypeValueRenderer(field.type.key, ref, value).subscribe(() => { }, err => { console.log(err) });
  }

}
