import { FormControl } from "@angular/forms";
import { IForm, IRecord } from "src/app/@shared/rvn-forms/types";

export interface RecordDeleteConfirmInput{
  valueFC: FormControl;
  parentForm: IForm;
  parentRecords: IRecord[];
}