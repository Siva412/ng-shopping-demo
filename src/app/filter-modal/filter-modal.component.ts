import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css']
})
export class FilterModalComponent implements OnInit {
  filterData: any;
  constructor(public dialogRef: MatDialogRef<FilterModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.filterData = this.data;
  }

  ngOnInit(): void {
  }
  searchData(data){
    this.dialogRef.close(data);
  }
}
