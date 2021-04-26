export interface RvnButtonInput {
    disabled?: boolean;
    color?: "primary" | "accent" | "warn";
    type?: "primary" | "secondary" | "tertiary" | "icon" | "icon-text" | "icon-text-primary" | "icon-text-secondary" | "fab" | "mini-fab",
    icon?: string;
    btnClass?: string;
}