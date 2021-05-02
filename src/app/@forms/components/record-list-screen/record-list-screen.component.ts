import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { RvnButtonInput } from 'src/app/@shared/rvn-core/components/rvn-button/rvn-button.input';
import { RvnCardInput } from 'src/app/@shared/rvn-core/components/rvn-card/rvn-card.input';
import { RvnInputInput } from 'src/app/@shared/rvn-core/components/rvn-input/rvn-input.input';
import { RvnDialogService } from 'src/app/@shared/rvn-core/services/rvn-dialog/rvn-dialog.service';
import { IForm, IRecord } from 'src/app/@shared/rvn-forms/types';
import { FormApiService } from 'src/app/@shared/rvn-services/form-api/form-api.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'record-list-screen',
  templateUrl: './record-list-screen.component.html',
  styleUrls: ['./record-list-screen.component.scss']
})
export class RecordListScreenComponent implements OnInit {

  constructor(
    private appService: AppService,
    private formApiService: FormApiService,
    private dialogService: RvnDialogService,
    private route: ActivatedRoute) { }

  @ViewChild("actions", { static: true }) actionsTemplate: TemplateRef<any>;

  records: IRecord[] = [];
  filteredRecords: IRecord[] = [];
  formId: number;
  formDefinition: IForm;
  listConfig = { list: [], lineOneKey: '__display', icon: 'assignment', actionTemplateRef: null, dense: true }
  newRecordButtonConfig: RvnButtonInput = { type: 'icon-text-primary', icon: 'add', color: 'primary' };
  searchRecordConfig: RvnInputInput = { label: 'Search', type: 'text', styleVersion: 'v2', suffixIcon: 'search' };
  cardConfig: RvnCardInput = {}
  searchFC = new FormControl("");

  ngOnInit(): void {
    this.appService.setToolBarHeading("Records");
    const route = this.route.snapshot;
    this.formId = route.params["id"];

    this.formApiService.getForm(this.formId).pipe(
      switchMap(form => {
        this.formDefinition = form;
        this.appService.setToolBarHeading(`${this.formDefinition.name} records`);
        return this.formApiService.getRecords(this.formId);
      }),
      map(records => {

        records.forEach(record => {
          const firstField = this.formDefinition.fields[0];
          console.log(record);
          record["__display"] = `ID: ${record.id}, ${firstField.name}: ${record.entry[firstField.id]}`;
        })

        this.records = records;
        this.filteredRecords = [...this.records];
        this.listConfig.list = this.filteredRecords;
        this.listConfig.actionTemplateRef = this.actionsTemplate;
        this.cardConfig.title = `Total: ${this.records.length}`;
      })
    ).subscribe();

    this.cardConfig.title = `Total: ${this.records.length}`;
    this.searchFC.valueChanges.subscribe(v => this.filterRecordsBySeach(v));
  }

  filterRecordsBySeach(searchTerm: string) {
    this.filteredRecords = [...this.records.filter(record => record)];
    this.listConfig.list = this.filteredRecords;
  }

  createRecord() {
    this.appService.navigate(`forms/${this.formId}/records/create`);
  }

  editRecord(record: IRecord) {
    this.appService.navigate(`forms/${this.formId}/records/${record.id}/edit`);
  }

  deleteRecord(record: IRecord) {
    this.dialogService.openConfirmDialog({
      title: 'Confirm',
      message: `Record will be deleted permanently. Are you sure?`,
      noButtonMessage: "Cancel",
      yesButtonMessage: "Delete",
      yesButtonConfig: { type: 'tertiary', color: 'warn' }
    }).pipe(
      switchMap((confirmed: boolean) => {
        return confirmed ? this.formApiService.deleteRecord(this.formId, record.id) : of(null);
      }))
      .subscribe(val => {
        if (val) this.ngOnInit()
      })
  }

}
