import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

  formDefinition: IForm;
  record: IRecord;
  formId: number
  recordId: number;
  recordFG: FormGroup;
  markRecordFGAsDirty$ = new Subject();


  mode: CreateOrEdit | "preview";
  initDone: boolean = false;

  ngOnInit(): void {

    const route = this.route.snapshot;
    this.mode = route.url[route.url.length - 1].path === "edit" ? "edit" : "create";
    this.formId = route.params["id"];

    let apisToCall: Observable<any>[] = [this.formApiService.getForm(this.formId)];

    if (this.mode === "edit") {
      this.recordId = route.params["recordId"];
      apisToCall.push(this.formApiService.getRecord(this.formId, this.recordId));
    }

    forkJoin(apisToCall).subscribe(
      results => {
        this.formDefinition = results[0];
        this.record = results[1];
        this.setHeading();
        this.initDone = true;
      },
      err => {
        this.navigateToRecordsList();
      }
    );
  }

  setHeading(){
    if (this.mode === "edit") {
      this.appService.setToolBarHeading(`Edit Record`);
    }else{
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
      //SAVE REVCORD
      console.log("sabedddddd")
    }
  }

}
