import { FormGroup, FormArray, FormControl } from "@angular/forms";


export function markNestedFormGroupDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
        switch (formGroup.get(key).constructor.name) {
            case "FormGroup":
                markNestedFormGroupDirty(formGroup.get(key) as FormGroup);
                break;
            case "FormArray":
                markFormArrayDirty(formGroup.get(key) as FormArray);
                break;
            case "FormControl":
                markFormControlDirty(formGroup.get(key) as FormControl);
                break;
        }
    });
}

export function markFormArrayDirty(formArray: FormArray) {
    formArray.controls.forEach(control => {
        switch (control.constructor.name) {
            case "FormGroup":
                markNestedFormGroupDirty(control as FormGroup);
                break;
            case "FormArray":
                markFormArrayDirty(control as FormArray);
                break;
            case "FormControl":
                markFormControlDirty(control as FormControl);
                break;
        }
    });
}

function markFormControlDirty(formControl: FormControl) {
    formControl.markAsDirty();
}