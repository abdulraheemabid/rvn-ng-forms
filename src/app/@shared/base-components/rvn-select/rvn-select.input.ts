import { KeyValue } from "@angular/common";

export interface RvnSelectInput {
    label: string;
    placeholder?: string;
    required?: boolean;
    hint?: string;
    requiredErrorMessage?: string;
    selectOptions: KeyValue<any, any>[];
    styleVersion?: "v1" | "v2"
}