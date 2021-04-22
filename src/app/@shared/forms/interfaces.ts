export interface IForm {
    formId?: number;
    name: string;
    fields: IFormField[];
    attributes?: JSON;
}

export interface IFormField {
    id?: number;
    name: string;
    type: FieldTypeEnum;
    required: boolean;
    validationRegex?: string;
    arrayValues?: string[];
    attributes?: JSON;
    markDeleted?: boolean;
}

export interface IRecord {
    formId: number;
    id?: number;
    entry: any;
    attributes?: JSON;
}

export enum FieldTypeEnum {
    FLOAT = "float",
    INT = "int",
    STRING = "string",
    DATE = "date",
    BOOL = "bool",
    MULTISELECT = "multiselect",
    SINGLESELECT = "singleselect"
}