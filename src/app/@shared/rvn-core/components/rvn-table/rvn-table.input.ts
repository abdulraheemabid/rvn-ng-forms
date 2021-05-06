import { ComponentRef, TemplateRef } from "@angular/core";
import { FormControl } from "@angular/forms";

export interface RvnTableInput {
  data: any[];
  columnsToDisplay: {
    keyName: string,
    displayName?: string,
    textAlign?: "center" | "left" | "right",
    customTemplate?: TemplateRef<any>;
    // customComponent?: any;
    // componentIngectToken?: string;
    backgroundClass?: string;
  }[];
  enableFilter?: boolean;
  useComponentFilter?: boolean;
  filterInputFC?: FormControl;
  stickColumnsAtStartIndexes?: number[];
  stickColumnsAtEndIndexes?: number[];
  noDataMessage?: string;
  noDataOnFilterMessage?: string;
  expandedRowTemplate?: TemplateRef<any>
  // expandedRowComponent?: any;
  // expandedComponentIngectToken?: string;
  enablePagination?: boolean;
  pageOptions?: number[];
}