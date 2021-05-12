import { KeyValue } from '@angular/common';
import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RvnButtonInput } from 'src/app/@shared/rvn-core/components/rvn-button/rvn-button.input';
import { RvnCardInput } from 'src/app/@shared/rvn-core/components/rvn-card/rvn-card.input';
import { RvnInputInput } from 'src/app/@shared/rvn-core/components/rvn-input/rvn-input.input';
import { RvnTableInput } from 'src/app/@shared/rvn-core/components/rvn-table/rvn-table.input';
import { RvnDialogService } from 'src/app/@shared/rvn-core/services/rvn-dialog/rvn-dialog.service';
import { TypeMetaService } from 'src/app/@shared/rvn-forms/type-meta-service/type-meta.service';
import { FieldType, IForm, IRecord } from 'src/app/@shared/rvn-forms/types';
import { FormApiService } from 'src/app/@shared/rvn-services/form-api/form-api.service';
import { FormService } from 'src/app/@shared/rvn-services/form/form.service';
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

  records: IRecord[] = [];
  filteredRecords: IRecord[] = [];
  formId: number;
  formDefinition: IForm;
  tableConfig: RvnTableInput = { data: [], columnsToDisplay: [], useComponentFilter: false, noDataMessage: "No records found !", noDataOnFilterMessage: "No records founds matching the search criteria" }
  newRecordButtonConfig: RvnButtonInput = { type: 'icon-text-primary', icon: 'add', color: 'primary' };
  searchRecordConfig: RvnInputInput = { label: 'Search', type: 'text', styleVersion: 'v2', suffixIcon: 'search' };
  cardConfig: RvnCardInput = {}
  searchFC = new FormControl("");
  initDone: boolean = false;
  numberOfColumnsToAddInTable: number = 5;

  ngOnInit(): void {
    this.initDone = false;
    this.appService.setToolBarHeading("Records");
    const route = this.route.snapshot;
    this.formId = route.params["id"];


    forkJoin([
      this.formApiService.getForm(this.formId),
      this.formApiService.getRecords(this.formId)]
    ).subscribe(results => {
      this.setFormDefinition(results[0]);
      this.setRecords(results[1]);
    })

    this.cardConfig.title = `Total: ${this.records.length}`;
  }

  setFormDefinition(form: IForm) {
    this.formDefinition = form;
    this.appService.setToolBarHeading(`${this.formDefinition.name} records`);
  }

  setRecords(records: IRecord[]) {
    this.records = records;
    this.filteredRecords = [...this.records];
    this.cardConfig.title = `Total: ${this.records.length}`;
    this.setTableConfig();
  }

  setTableConfig() {
    this.tableConfig.data = this.filteredRecords;
    this.tableConfig.columnsToDisplay = this.formDefinition.fields.map(f => {
      return {
        keyName: f.id.toString(),
        displayName: f.name,
      }
    });

    if (this.tableConfig.columnsToDisplay.length > this.numberOfColumnsToAddInTable)
      this.tableConfig.columnsToDisplay = this.tableConfig.columnsToDisplay.slice(0, this.numberOfColumnsToAddInTable);

    this.tableConfig.filterInputFC = this.searchFC;
    this.initDone = true;
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
      messages: [`Record will be deleted permanently.`, `Are you sure?`],
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

  test(row){
    console.log(row);
  }

}
