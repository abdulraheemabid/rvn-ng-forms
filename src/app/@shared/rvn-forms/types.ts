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
    type: KeyValue<FieldType, string>;
    required: boolean;
    validationRegex?: string;
    arrayValues?: KeyValue<string, string>[];
    attributes?: {
        position: number;
        displayAs?: KeyValue<string, UIControlEnum>;
    };
    markDeleted?: boolean;
}

export interface IRecord {
    id?: number;
    entry: any;
    attributes?: any;
}

export interface IFieldTypeMeta {
    typeDisplayName: string;
    definitionRenderer: any;
    inputRenderers: {
        UIControl: UIControlEnum,
        renderer: any
    }[];
}

export interface IId {
    id: number
}

export type FieldType = "float" | "int" | "string" | "date" | "bool" | "multiselect" | "singleselect";

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