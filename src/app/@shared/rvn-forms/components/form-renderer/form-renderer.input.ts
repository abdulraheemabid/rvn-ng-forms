import { Subject } from "rxjs";
import { CreateOrEdit } from "src/app/@shared/rvn-core/utils/types";
import { IForm, IRecord } from "src/app/@shared/rvn-forms/types";

export interface FormRendererInput {
  formDefinition: IForm;
  mode?: CreateOrEdit | "preview";
  record?: IRecord;
  parentRecords?: IRecord[];
  parentForm?: IForm;
  markFGAsDirtySubject$?: Subject<any>;
  preSelectedParentRecordId?: number;
}