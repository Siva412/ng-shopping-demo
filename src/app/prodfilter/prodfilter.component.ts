import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prodfilter',
  templateUrl: './prodfilter.component.html',
  styleUrls: ['./prodfilter.component.css']
})
export class ProdfilterComponent implements OnInit {
  @Input() filterData: any = {
    rating: 5,
    filters: []
  };
  @Output() filterEvt = new EventEmitter<any>();
  amountLimit: any = {
    min: '',
    max: ''
  }
  selectedFilter: any = {};
  checkboxData: any = {};
  constructor() { }

  ngOnInit(): void {

  }
  search() {
    let searchObj = {...this.selectedFilter};
    if(this.amountLimit.min || this.amountLimit.max){
      searchObj.amountLimit = {...this.amountLimit};
    }
    if(Object.keys(searchObj)?.length>0){
      this.filterEvt.emit(searchObj);
    }
  }
  selectionChange(type, value, event) {
    const ftrType = type.toLowerCase();
    if (!this.selectedFilter[ftrType]) {
      this.selectedFilter[ftrType] = [];
      this.selectedFilter[ftrType].push(value);
      return;
    }
    if(event.checked){
      this.selectedFilter[ftrType].push(value);
    }
    else{
      this.selectedFilter[ftrType].pop(value);
      this.selectedFilter[ftrType].length === 0?(delete this.selectedFilter[ftrType]):null
    }
  }
  selectRating(rating){
    this.selectedFilter.rating = rating;
  }
  clearRating(){
    delete this.selectedFilter.rating;
  }
  clear(){
    this.selectedFilter = {};
    this.checkboxData = {};
    this.amountLimit={min: '',max: ''};
    this.filterEvt.emit({});
  }
}
