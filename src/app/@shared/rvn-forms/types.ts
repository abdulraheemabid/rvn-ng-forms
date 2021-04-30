import { KeyValue } from "@angular/common";

export interface IForm {
    id?: number;
    name: string;
    fields: IFormField[];
    attributes?: any;
}

export interface IFormField {
    id?: number;
    name: string;
    type: KeyValue<string, string>;
    required: boolean;
    validationRegex?: string;
    arrayValues?: KeyValue<string, string>[];
    attributes?: {
        position: number;
        displayAs: KeyValue<string, UIControlEnum>;
    };
    markDeleted?: boolean;
}

export interface IRecord {
    formId: number;
    id?: number;
    entry: any;
    attributes?: any;
}

export interface IFieldTypeMeta {
    typeDisplayName: string;
    definitionRenderer: any;
    valueRenderers: {
        UIControl: UIControlEnum,
        renderer: any
    }[];
}

export interface IId {
    id: number
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

export enum UIControlEnum {
    SELECT = "SELECT",
    INPUT = "INPUT",
    CHECKBOX = "CHECKBOX",
    RADIO = "RADIO",
    DATEPICKER = "DATEPICKER",
    CHIPSINPUT = "CHIPSINPUT",
    TOGGLE = "TOGGLE"
}

export enum UIControlNameEnum {
    SELECT = "Dropdown",
    INPUT = "Text field",
    NUMBERINPUT = "Number field",
    CHECKBOX = "Chekbox",
    RADIO = "Radio",
    DATEPICKER = "Date picker",
    CHIPSINPUT = "Chips",
    TOGGLE = "Swtich"
}