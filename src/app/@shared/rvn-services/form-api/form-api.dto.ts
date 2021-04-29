import { FieldTypeEnum } from "../../rvn-forms/types";


//DTOs
export interface FormDTO {
    name: string;
    fields: FormFieldDTO[];
    attributes?: JSON;
    request: any
}

export interface FormUpdateDTO {
    formId: number;
    name?: string;
    fields?: FormFieldDTO[];
    attributes?: JSON;
    request: any
}

export interface FormFieldDTO {
    //need for update case
    id?: number;
    name: string;
    type: FieldTypeEnum;
    required: boolean;
    validationRegex?: string;
    arrayValues?: string[];
    attributes?: JSON;
    //need for update case
    markDeleted?: boolean;
}

export interface FormIdDTO {
    formId: number;
}

export interface RecordDTO {
    formId: number;
    entry: any;
    attributes?: JSON;
    request: any;
}

export interface RecordUpdateDTO {
    formId: number;
    id: number;
    entry: any;
    attributes?: JSON;
    request: any;
}

export interface RecordIdDTO {
    formId: number;
    recordId: number;
}