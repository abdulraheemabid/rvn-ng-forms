import { KeyValue } from "@angular/common";

export interface RvnChipsInputInput {
    label: string;
    placeholder?: string;
    required?: boolean,
    hint?: string,
    requiredErrorMessage?: string,
    styleVersion?: "v1" | "v2"
}