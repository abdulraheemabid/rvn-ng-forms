import { KeyValue } from "@angular/common";

export interface RvnChipsAutocompleteInput {
    label: string;
    placeholder?: string;
    required?: boolean,
    hint?: string,
    requiredErrorMessage?: string,
    styleVersion?: "v1" | "v2",
    autoCompleteOption: KeyValue<any, any>[];
}