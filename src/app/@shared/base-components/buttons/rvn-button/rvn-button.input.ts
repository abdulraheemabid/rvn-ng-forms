export interface RvnButtonInput {
    label?: string;
    disabled?: boolean;
    color?: "primary" | "accent" | "warn";
    type?: "primary" | "secondary" | "tertiary" | "icon" | "icon-text" | "icon-text-primary" | "icon-text-secondary" | "fab" | "mini-fab",
    icon?: string;
}