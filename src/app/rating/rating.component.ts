import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input('value') ratingValue:number = 0;
  @Input('count') ratingCount:number = 0;
  rating = [1,2,3,4,5];
  constructor() { }

}
