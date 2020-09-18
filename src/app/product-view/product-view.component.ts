import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  prodData: any;
  selectedQty: number = 1;
  quantity: number[] = [];
  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
    if (window.history.state && window.history.state.prodData) {
      this.prodData = window.history.state.prodData;
      for (let i = 1; i <= this.prodData.maxQuantity; i++) {
        this.quantity.push(i);
      }
    }
    else {
      this.router.navigate(['home']);
    }
  }

  addToCart() {
    if (!this.commonService.itemPresentInCart(this.prodData.id)) {
      const addedItem = { ...this.prodData, "selectedQuantity": this.selectedQty };
      this.commonService.setCartItems(addedItem);
    }
  }

  buyNow(){
    this.commonService.setPurchaseItem({ ...this.prodData, "selectedQuantity": this.selectedQty });
    if(this.commonService.getLoginFlag()){
      this.router.navigate(['confirm']);
    }
    else{
      this.commonService.navigateTo = 'confirm';
      this.router.navigate(['']);
    }
  }

}
