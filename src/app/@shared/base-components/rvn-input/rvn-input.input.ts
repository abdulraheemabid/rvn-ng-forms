import { FormControl } from "@angular/forms";

export interface RvnInputInput {
    label: string;
    placeholder?: string;
    type?: "number" | "text",
    required?: boolean,
    hint?: string,
    requiredErrorMessage?: string,
    styleVersion?: "v1" | "v2"
}