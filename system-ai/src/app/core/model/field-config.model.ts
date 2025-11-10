import { FormControl } from "@angular/forms";

export interface FieldConfig {
    id: string;
    key: string;
    controlName: FormControl;
    label?: string;
    placeholder?: string;
    required?: boolean;
    readonly?: boolean;
    options?: { label: string; value: any }[];
    hint?: string;
    maxLength?: any;
    class?: string;
    layout?: string;
    type?: string;
    invalid?: boolean;
    width?: string
}
