import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class CustomValidators {
    whiteSpaceValidator(): ValidatorFn {
        return (control: AbstractControl): {[key: string]:any} | null => {
            if (control.value && control.value.trim().length === 0) {
                return { whiteSpace: true }
            }
            return null;
        }
    }
}