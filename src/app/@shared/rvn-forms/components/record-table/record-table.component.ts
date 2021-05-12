import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { RvnTableInput } from 'src/app/@shared/rvn-core/components/rvn-table/rvn-table.input';
import { isNullOrUndefined } from 'src/app/@shared/rvn-core/utils/funtions.util';
import { IForm } from 'src/app/@shared/rvn-forms/types';

@Component({
  selector: 'record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.scss']
})
export class RecordTableComponent implements OnInit {

  constructor() { }

  @ViewChild("cell", { static: true }) cellTemplate: TemplateRef<any>;
  @ViewChild("updatedOnTemplate", { static: true }) updatedOnTemplate: TemplateRef<any>;
  @ViewChild("expandedContent", { static: true }) expandedContentTemplate: TemplateRef<any>;

  @Input() tableConfig: RvnTableInput;
  @Input() formDefinition: IForm;
  @Input() actionsTemplate: TemplateRef<any>;
  @Output() rowClicked: EventEmitter<any> = new EventEmitter<any>();

  initDone: boolean = false;

  ngOnInit(): void {
    this.tableConfig.data = this.tableConfig.data.map(record => {
      record = { ...record.entry, ...record, };
      return record;
    });
    
    this.tableConfig.columnsToDisplay.forEach(c => c.customTemplate = this.cellTemplate);

    this.tableConfig.columnsToDisplay.push({ keyName: "updatedOn", displayName: 'last updated', customTemplate: this.updatedOnTemplate });
    this.tableConfig.columnsToDisplay.unshift({ keyName: "id", displayName: 'Id' });

    this.tableConfig.expandedRowTemplate = this.expandedContentTemplate;

    if (!isNullOrUndefined(this.actionsTemplate))
      this.tableConfig.columnsToDisplay.push({ keyName: "actions", displayName: "", customTemplate: this.actionsTemplate, textAlign: "right" });

    this.initDone = true;
  }

  onRowClicked(row) {
    this.rowClicked.emit(row);
  }


}
