import { Subject } from "rxjs";
import { CreateOrEdit } from '@abdulraheemabid/rvn-pkg-ng-core';
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