import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { CommonService } from '../services/common.service';
import { URL } from '../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  productList: any;
  brands: String[];
  processors: String[];
  ram: String[];
  filterData: any;
  dialogRef: any;
  loader: boolean = false;
  searchSubscrpt: Subscription;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog, private commonService: CommonService) { }

  ngOnInit(): void {
    this.loader = true;
    this.commonService.makeApiCall('/api/prodfilter/Laptop', 'GET').subscribe((data: any) => {
      if (data.errorcode === 0) {
        this.filterData = data.filterData;
      }
    }, (err) => {

    })

    this.searchSubscrpt = this.commonService.getSearchObs().subscribe((data: any) => {
      if (data) {
        this.searchData({ searchText: data });
        this.commonService.resetSearchSubject();
      }
      else{
        this.onLoadListCall();
      }
    })
  }
  onLoadListCall(){
    this.commonService.makeApiCall('/api/products/search', 'POST').subscribe((data: any) => {
      this.loader = false;
      if (data && data.list) {
        this.productList = data.list.map(item => {
          return { ...item, url: `${URL}/api/products/img/${item.id}` }
        });
      }
    }, (err) => {
      this.loader = false;
    });
  }
  viewProduct(item) {
    this.router.navigate(['prodview'], { relativeTo: this.activatedRoute, state: { prodData: item } })
  }
  openFilter() {
    this.dialogRef = this.dialog.open(FilterModalComponent, {
      height: '500px',
      data: this.filterData,
      panelClass: 'testClass'
    });
    this.dialogRef.afterClosed().subscribe(data => {
      this.searchData(data);
    })
  }
  searchData(data) {
    this.loader = true;
    this.commonService.makeApiCall('/api/products/search', 'POST', data).subscribe((data: any) => {
      this.loader = false;
      if (data.errorcode === 0) {
        this.productList = data.list.map(item => {
          return { ...item, url: `${URL}/api/products/img/${item.id}` }
        });
      }
    }, (err) => {
      this.loader = false;
    })
  }
  ngOnDestroy() {
    this.searchSubscrpt.unsubscribe();
  }
}
