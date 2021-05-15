import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'src/app/@shared/rvn-core/utils/funtions.util';
import { CreateOrEdit } from 'src/app/@shared/rvn-core/utils/types';
import { IForm, IRecord } from 'src/app/@shared/rvn-forms/types';
import { FormApiService } from 'src/app/@shared/rvn-services/form-api/form-api.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'record-screen',
  templateUrl: './record-screen.component.html',
  styleUrls: ['./record-screen.component.scss']
})
export class RecordScreenComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private formApiService: FormApiService,
    private appService: AppService) { }

  form: IForm;
  record: IRecord = { entry: {} };
  formId: number
  recordId: number;
  recordFG: FormGroup = new FormGroup({});
  markRecordFGAsDirty$ = new Subject();
  parentRecords: IRecord[];
  parentForm: IForm;

  mode: CreateOrEdit;
  initDone: boolean = false;

  ngOnInit(): void {

    const route = this.route.snapshot;
    this.mode = route.url[route.url.length - 1].path === "edit" ? "edit" : "create";
    this.formId = route.params["id"];
    this.setHeading();

    let apisToCall: Observable<any>[] = [this.formApiService.getForm(this.formId)];

    if (this.mode === "edit") {
      this.recordId = route.params["recordId"];
      apisToCall.push(this.formApiService.getRecord(this.formId, this.recordId));
    }

    forkJoin(apisToCall).subscribe(
      results => {
        this.form = results[0];

        if (!isNullOrUndefined(results[1])) this.record = results[1];

        if (!isNullOrUndefined(this.form?.attributes?.parentForm?.formId))
          this.getParentData();
        else
          this.initDone = true;
      },
      err => {
        this.navigateToRecordsList();
      }
    );
  }

  getParentData() {
    forkJoin(
      [
        this.formApiService.getRecords(this.form.attributes.parentForm.formId),
        this.formApiService.getForm(this.form.attributes.parentForm.formId),
      ]
    ).subscribe(
      results => {
        this.parentRecords = results[0];
        this.parentForm = results[1];
        this.initDone = true;
      }
    );
  }

  setHeading() {
    if (this.mode === "edit") {
      this.appService.setToolBarHeading(`Edit Record`);
    } else {
      this.appService.setToolBarHeading(`Create Record`);
    }
  }

  navigateToRecordsList() {
    this.appService.navigate(`forms/${this.formId}/records`);
  }

  onRecordUpdate(value) {
    this.recordFG = value;
  }

  submit() {
    this.markRecordFGAsDirty$.next();

    if (this.recordFG.status === "VALID") {
      const record = { ...this.record, ...this.recordFG.getRawValue() };
      if (this.mode === "edit")
        this.formApiService.updateRecord(this.formId, record).subscribe(_ => this.navigateToRecordsList());
      else
        this.formApiService.createRecord(this.formId, record).subscribe(_ => this.navigateToRecordsList());
    }
  }

}
