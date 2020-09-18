import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderStatus'
})

export class OrderStatus implements PipeTransform {
    transform(value: any): number {
        if(value === 'payment'){
            return 0
        }
        if(value === 'shipping'){
            return 1
        }
        if(value === 'delivered'){
            return 2
        }
        return 0;
    }
}