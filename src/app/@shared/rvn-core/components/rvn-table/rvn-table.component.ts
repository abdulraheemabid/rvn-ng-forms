import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from '../../utils/funtions.util';
import { RvnTableInput } from './rvn-table.input';

@Component({
  selector: 'rvn-table',
  templateUrl: './rvn-table.component.html',
  styleUrls: ['./rvn-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RvnTableComponent implements OnInit {

  constructor() { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() params: RvnTableInput;

  dataSource;
  expandedRow;
  initDone: boolean = false;
  columnsToDisplayNames: string[];

  ngOnInit(): void {

    this.handleDefaultInputValues();

    if (this.params.enableFilter)
      this.params.filterInputFC.valueChanges.subscribe(value => this.applyFilter(value));

    this.dataSource = new MatTableDataSource(this.params.data);
    this.initDone = true;

  }

  handleDefaultInputValues() {
    if (isNullOrUndefined(this.params)) this.params = { columnsToDisplay: [], data: [] }
    if (isNullOrUndefined(this.params.data)) this.params.data = [];
    if (isNullOrUndefined(this.params.columnsToDisplay)) this.params.columnsToDisplay = [];
    if (isNullOrUndefined(this.params.enableFilter)) this.params.enableFilter = true;
    if (isNullOrUndefined(this.params.useComponentFilter)) this.params.useComponentFilter = true;
    if (isNullOrUndefined(this.params.filterInputFC)) this.params.filterInputFC = new FormControl(null);
    if (isNullOrUndefined(this.params.stickColumnsAtStartIndexes)) this.params.stickColumnsAtStartIndexes = [];
    if (isNullOrUndefined(this.params.stickColumnsAtEndIndexes)) this.params.stickColumnsAtEndIndexes = [];
    if (isNullOrUndefined(this.params.noDataMessage)) this.params.noDataMessage = "No data !";
    if (isNullOrUndefined(this.params.noDataOnFilterMessage)) this.params.noDataOnFilterMessage = "No data matching the filter!";
    if (isNullOrUndefined(this.params.templateToShowOnRowExpand)) this.params.templateToShowOnRowExpand = null;
    if (isNullOrUndefined(this.params.enablePagination)) this.params.enablePagination = false;
    if (isNullOrUndefined(this.params.pageOptions)) this.params.pageOptions = [10, 25, 50];
    this.columnsToDisplayNames = this.params.columnsToDisplay.map(c => c.keyName);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getJustifyContentClassByTextAlign(indexOfColumnsToDisplay: number) {
    switch (this.params.columnsToDisplay[indexOfColumnsToDisplay].textAlign) {
      case "center":
        return "col-flex-center";
      case "left":
        return "col-flex-start";
      case "right":
        return "col-flex-end";
      default:
        return "";
    }
  }
}