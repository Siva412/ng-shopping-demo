import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

export interface ComponentDeactivate {
    canDeactivate: () => boolean
}

@Injectable({
    providedIn: 'root'
})


export class CanDeactivateComp implements CanDeactivate<ComponentDeactivate>{
    canDeactivate(component: ComponentDeactivate) {
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}