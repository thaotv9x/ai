import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from '../model/field-config.model';

@Injectable({ providedIn: 'root' })
export class FormBuilderService {
    private static idCounter = 0;
    buildForm(schema: Partial<FieldConfig>[]): { formGroup: FormGroup; fieldConfigs: Record<string, FieldConfig> } {
        const controls: { [key: string]: FormControl } = {};
        const fieldConfigs: Record<string, FieldConfig> = {};

        for (const field of schema) {
            const validators = field.required ? [Validators.required] : [];
            const control = new FormControl(null, validators);
            const uniqueId = `field_${FormBuilderService.idCounter++}`;
            controls[field.key!] = control;
            fieldConfigs[field.key!] = {
                id: field.id ? field.id : uniqueId,
                key: field.key!,
                controlName: controls[field.key!],
                label: field.label,
                placeholder: field.placeholder,
                required: field.required,
                readonly: field.readonly,
                options: field.options,
                hint: field.hint,
                class: field.class,
                layout: field.layout,
                invalid: field.invalid,
                type: field.type,
                maxLength: field.maxLength,
                width: field.width
            };
        }

        return { formGroup: new FormGroup(controls), fieldConfigs };
    }

    // Phương thức để đặt lại bộ đếm ID nếu cần
    static resetIdCounter(): void {
        FormBuilderService.idCounter = 0;
    }
}
