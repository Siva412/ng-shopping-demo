import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { URL } from '../../environments/environment';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  cartItems:any = [];
  historyItems:any = [];
  loader:boolean = true;
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.cartItems = [...this.commonService.getTotalItems()];
    this.loader = true;
    this.commonService.makeApiCall('/api/products/purchaseHistory', 'GET').subscribe((data:any) => {
      this.loader = false;
      if(data.errorcode === 0){
        this.historyItems = data.historyList.map(item => ({...item, url: `${URL}/api/products/img/${item.id}`}));
      }
    }, (err) => {
      this.loader = false;
    })
  }

}
