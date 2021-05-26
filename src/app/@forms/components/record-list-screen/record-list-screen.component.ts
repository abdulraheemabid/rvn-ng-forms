import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { isNullOrUndefined, RvnButtonInput, RvnCardInput, RvnDialogService, RvnInputInput, RvnTableInput } from '@abdulraheemabid/rvn-pkg-ng-core';
import { FormApiService, RecordDeleteConfirmComponent } from '@abdulraheemabid/rvn-pkg-ng-forms';
import { IRecord, IForm } from '@abdulraheemabid/rvn-pkg-ng-forms/lib/types';
import { AppService } from 'src/app/app.service';

/**
 * This screen displays all the records of a given form in a expandable grid. With each record, user gets the option to
 * edit/delete it or view its children. Along with the option to create a new record for this form.
 * 
 * This component calls multiple APIs to bring in:
 * 1. List of forms.
 * 2. Form details for which we need to see the records of.
 * 3. Children of the forms.
 * 4. Records of the forms.
 * 
 * Some of the API calls are redundant and needs improvements from the Backend. 
 * But this problem is currently solved by caching all the form related (1, 2 & 3 in this case) API calls by the interceptor.
 */
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
  forms: IForm[];
  formId: number;
  formDefinition: IForm;
  formDirectChildren: IForm[] = [];
  parentRecordId: number;
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
    this.appService.setToolBarHeading("Records");

    const route = this.route.params.subscribe(params => {
      this.initDone = false;
      this.formId = params["id"];
      this.parentRecordId = params["parentRecordId"];
      this.getData();
    });

  }

  getData() {
    forkJoin([
      this.formApiService.getForms(),
      this.formApiService.getForm(this.formId),
      this.formApiService.getRecords(this.formId, this.parentRecordId),
      this.formApiService.getFormDirectChildren(this.formId),
    ]
    ).subscribe(results => {
      this.forms = results[0];
      this.setFormDefinition(results[1]);
      this.setRecords(results[2]);
      this.setFormChildrens(results[3], this.forms);
      this.cardConfig.title = `Total: ${this.records.length}`;
    })
  }

  setFormChildrens(childrenIds: number[], forms: IForm[]) {
    this.formDirectChildren = childrenIds.map(id => forms.find(f => f.id === id));
  }

  setFormDefinition(form: IForm) {
    this.formDefinition = form;
    if (isNullOrUndefined(this.parentRecordId)) this.appService.setToolBarHeading(`${this.formDefinition.name} records`);
    else this.appService.setToolBarHeading(`${this.formDefinition.name} records / Parent Id: ${this.parentRecordId}`)
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
    const path = isNullOrUndefined(this.parentRecordId) ?
      `forms/${this.formId}/records/create` :
      `forms/${this.formId}/records/create?parentRecordId=${this.parentRecordId}`
    this.appService.navigate(path);
  }

  editRecord(record: IRecord) {
    this.appService.navigate(`forms/${this.formId}/records/${record.id}/edit`);
  }

  deleteRecord(record: IRecord) {
    if (this.formDirectChildren.length === 0) {
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
      .subscribe(val => this.onDelete(val))
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
      .subscribe(val => this.onDelete(val))
  }

  onDelete(value) {
    if (value) {
      this.initDone = false;
      setTimeout(() => this.getData());
    }
  }

  viewChildRecords(record: IRecord, form: IForm) {
    this.appService.navigate(`forms/${form.id}/records/${record.id}`);
  }

}
