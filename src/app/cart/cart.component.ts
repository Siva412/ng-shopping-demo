import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any = [];
  itemsPrice: number = 0;
  totalPrice: number = 0;
  deliveryCharges: number = 0;
  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = [...this.commonService.cartItems];
    this.updateCart();
  }
  removeItem(id) {
    this.commonService.removeCartItem(id);
    this.cartItems = [...this.commonService.cartItems];
    this.updateCart();
  }
  updateCart() {
    if (this.cartItems.length > 0) {
      this.itemsPrice = this.cartItems.reduce((total, item) => (total + item.price*item.selectedQuantity), 0);
      this.itemsPrice >= 1000 ? (this.deliveryCharges = 50) : null;
      this.totalPrice = this.itemsPrice + this.deliveryCharges;
      this.commonService.updateCartItems(this.cartItems);
    }
    else{
      this.itemsPrice = 0;
      this.deliveryCharges = 0;
      this.totalPrice = 0;
    }
  }
  placeOrder(){
    if(this.commonService.getLoginFlag()){
      this.router.navigate(['confirm']);
    }
    else{
      this.commonService.navigateTo = 'confirm';
      this.router.navigate(['']);
    }
  }
}
