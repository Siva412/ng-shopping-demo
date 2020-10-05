import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { CustomValidators } from '../services/validation.service';

@Directive({
    selector: '[whitespaceValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: WhitespaceValidator}]
})
export class WhitespaceValidator implements Validator{
    validate(control: AbstractControl): any{
        let val = new CustomValidators();
        return val.whiteSpaceValidator();
    }
}