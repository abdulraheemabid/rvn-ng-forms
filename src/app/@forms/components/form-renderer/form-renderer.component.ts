import { Component, Input, OnChanges, QueryList, SimpleChanges, ViewChildren, ViewContainerRef } from '@angular/core';
import { RvnFormService } from 'src/app/@shared/forms/services/form.service';
import { IForm, IFormField } from 'src/app/@shared/forms/types';
import { isNullOrUndefined } from 'src/app/@shared/utils/funtions.util';

@Component({
  selector: 'form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss']
})
export class FormRendererComponent implements OnChanges {

  constructor(private formService: RvnFormService) { }

  @Input() formDefinition: IForm;
  @ViewChildren("fieldAnchorPoint", { read: ViewContainerRef }) fieldAnchorPoints: QueryList<ViewContainerRef>;

  ngOnChanges(changes: SimpleChanges): void {
    this.formDefinition.fields = this.formDefinition.fields.sort((a, b) => a.attributes.position - b.attributes.position);
    // TODO: need settimeout so that ngFor is done initializing. Cant find appropriate hook
    setTimeout(() => this.formDefinition.fields.forEach(f => this.renderFormValueUI(f)));
  }

  renderFormValueUI(field: IFormField) {
    if (!isNullOrUndefined(field?.type) && !isNullOrUndefined(field.attributes?.position)) {

      const ref = this.fieldAnchorPoints.get(field.attributes.position);
      this.formService.injectTypeValueRenderer(field, ref).subscribe();

    }

  }

}
