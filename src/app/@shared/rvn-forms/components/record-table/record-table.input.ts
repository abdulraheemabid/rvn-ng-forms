import { TemplateRef } from "@angular/core";
import { RvnTableInput } from "src/app/@shared/rvn-core/components/rvn-table/rvn-table.input";
import { IForm } from "../../types";

export interface RecordTableInput {
  tableConfig: RvnTableInput;
  formDefinition: IForm;
  actionsTemplate?: TemplateRef<any>;
}