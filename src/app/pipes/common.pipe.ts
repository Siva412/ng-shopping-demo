import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: "quantArray"
})
export class QuantArray implements PipeTransform {
    transform(input){
        const arr = [];
        if(isNaN(input)){
            return arr;
        }
        for (let i = 1; i <= input; i++) {
            arr.push(i);
        }
        return arr;
    }
}