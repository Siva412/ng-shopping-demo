import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[mobileValid]'
})
export class MobileValid {
    @HostListener('keydown', ['$event'])
    onKeyDown(e) {
        const value = e.currentTarget.value;
        if ((e.keyCode < 96 || e.keyCode > 105 || e.keyCode < 48 || e.keyCode > 57 || value?.length > 9) && e.keyCode != 8 && e.keyCode != 9 && e.key != 'ArrowLeft' && e.key != 'ArrowRight') {
            e.preventDefault();
        }
    }
}