import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RvnButtonInput } from 'src/app/@shared/rvn-core/components/rvn-button/rvn-button.input';
import { RvnCardInput } from 'src/app/@shared/rvn-core/components/rvn-card/rvn-card.input';
import { RvnInputInput } from 'src/app/@shared/rvn-core/components/rvn-input/rvn-input.input';
import { RvnTableInput } from 'src/app/@shared/rvn-core/components/rvn-table/rvn-table.input';
import { RvnDialogService } from 'src/app/@shared/rvn-core/services/rvn-dialog/rvn-dialog.service';
import { isNullOrUndefined } from 'src/app/@shared/rvn-core/utils/funtions.util';
import { IForm, IRecord } from 'src/app/@shared/rvn-forms/types';
import { FormApiService } from 'src/app/@shared/rvn-services/form-api/form-api.service';
import { AppService } from 'src/app/app.service';
import { RecordDeleteConfirmComponent } from '../record-delete-confirm/record-delete-confirm.component';

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
  // in case of delete, we ask for new parent
  newParentIdFC: FormControl = new FormControl("", [Validators.required]);

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
    if (isNullOrUndefined(this.formDefinition.attributes.parentForm.formId)) {
      this.openDeleteConfirmDialog(record);
    } else {
      this.openDeleteConfirmDialogWithParent(record)
    }
  }

  openDeleteConfirmDialogWithParent(record: IRecord) {
    let dialog = this.dialogService.openComponentDialog({
      component: RecordDeleteConfirmComponent,
      title: `Confirm Delete`,
      showActionBtns: true,
      primaryButtonMessage: "Choose parent and delete",
      primaryButtonConfig: { type: 'tertiary', color: 'warn' },
      secondaryButtonConfig: { type: 'tertiary', color: null },
      secondaryButtonMessage: "Cancel",
      componentInputs: [
        {
          key: 'config', value: {
            valueFC: this.newParentIdFC,
            parentForm: this.formDefinition,
            parentRecords: this.records.filter(r => r.id !== record.id)
          }
        },
      ]
    });

    dialog.dialogRef.afterClosed().pipe(
      switchMap((confirmed: boolean) => {
        if (confirmed) {
          if (this.newParentIdFC.valid) {
            return this.formApiService.deleteRecord(this.formId, record.id, this.newParentIdFC.value)
          } else {
            this.newParentIdFC.markAsDirty();
          }
        }
        return of(null);
      }))
      .subscribe(val => {
        if (val) this.ngOnInit()
      })
  }

  openDeleteConfirmDialog(record: IRecord) {
    this.dialogService.openConfirmDialog({
      title: 'Confirm Delete',
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

}
