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
    FLOAT = "Floating number",
    INT = "Integer",
    STRING = "Text",
    DATE = "Date",
    BOOL = "Boolean",
    MULTISELECT = "Multi select",
    SINGLESELECT = "Single select"
}

export enum UIControlNameEnum{
    SELECT = "Dropdown",
    INPUT = "Text field",
    NUMBERINPUT = "Number field",
    CHECKBOX = "Chekbox",
    RADIO = "Radio",
    DATEPICKER = "Date picker",
    CHIPSINPUT = "Chips",
    TOGGLE = "Swtich"
}