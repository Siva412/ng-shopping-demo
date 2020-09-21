import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[mobileValid]'
})
export class MobileValid {
    @HostListener('keydown', ['$event'])
    onKeyDown(e) {
        const value = e.currentTarget.value;
        console.log(e.keyCode);
        
        if ((!(e.keyCode > 95 && e.keyCode < 106) && !(e.keyCode > 46 && e.keyCode < 58) || value?.length > 9) && e.keyCode != 8 && e.keyCode != 9 && e.key != 'ArrowLeft' && e.key != 'ArrowRight') {
            e.preventDefault();
        }
    }
}