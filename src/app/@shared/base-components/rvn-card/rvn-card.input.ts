import { TemplateRef } from "@angular/core";

export interface RvnCardInput {
    headerIcon?: string;
    title?: string;
    subtitle?: string;
    headerAction?: TemplateRef<any>;
    content?: TemplateRef<any>;
    footer?: TemplateRef<any>;
}