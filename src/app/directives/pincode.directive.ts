import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[pincodeValid]'
})
export class PincodeValid {
    @HostListener('keydown', ['$event'])
    onKeyDown(e) {
        const value = e.currentTarget.value;
        if ((e.keyCode < 97 || e.keyCode > 105 || value?.length > 5) && e.keyCode != 8 && e.keyCode != 9 && e.key != 'ArrowLeft' && e.key != 'ArrowRight') {
            e.preventDefault();
        }
    }
}