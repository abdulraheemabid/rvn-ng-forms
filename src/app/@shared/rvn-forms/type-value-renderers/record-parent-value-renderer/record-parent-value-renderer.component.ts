import { Component, Input, OnInit } from '@angular/core';
import { RvnDialogService } from 'src/app/@shared/rvn-core/services/rvn-dialog/rvn-dialog.service';
import { FormService } from 'src/app/@shared/rvn-services/form/form.service';
import { IForm, IRecord } from '../../types';

@Component({
  selector: 'record-parent-value-renderer',
  templateUrl: './record-parent-value-renderer.component.html',
  styleUrls: ['./record-parent-value-renderer.component.scss']
})
export class RecordParentValueRendererComponent implements OnInit {

  // think about inputs
  // @Input() form: IForm;
  // @Input() records: IRecord;
  @Input() value;
  parentFieldName: string;

  constructor(private dialogService: RvnDialogService, private formService: FormService) { }

  ngOnInit(): void {
    //this.parentFieldName = this.formService.getSingularFormName(this.form);

  }

  openSelectParentDialog() {
    // let dialogRefOutput = this.dialogService.openComponentDialog({
    //   title: `${this.parentFieldName}`,
    //   component: RecordParentValueRendererComponent,
    //   showActionBtns: true,
    //   showOnlyPrimaryButton: true,
    //   primaryButtonMessage: "Back",
    //   componentInputs: [
    //     { key: "form", value: "select" },
    //     { key: "records", value: this.parentForm },
    //   ]
    // });

    // TODO: now now now 
    // open record-view component in dialog and pass in recrod parent form and parent record objects
    // for that need api call
    // update backend to include parent


  }

}
