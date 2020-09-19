import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  addressForm: FormGroup;
  paymentForm: FormGroup;
  cartItems: any;
  itemsPrice: number;
  deliveryCharges: number = 0;
  addressString: string = '';
  loader: boolean = false;
  constructor(private fb: FormBuilder, private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      "name": ['', [Validators.required]],
      "address1": ['', [Validators.required]],
      "address2": [''],
      "city": ['', [Validators.required]],
      "pincode": ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      "mobile": ['', [Validators.required, Validators.pattern(/^[6789]{1}\d{9}$/)]]
    });

    this.paymentForm = this.fb.group({
      "paymentType": ['card']
    });
    if(this.commonService.purchaseItems?.length > 0){
      this.cartItems = [...this.commonService.purchaseItems];
    }
    else{
      this.cartItems = [...this.commonService.getTotalItems()];
    }
    this.itemsPrice = this.commonService.itemsPrice();
    this.itemsPrice >= 1000 ? this.deliveryCharges = 50 : null;
    this.commonService.purchaseItems = [];
  }
  addressSubmitted() {
    this.addressString = "";
    for (let key in this.addressForm.value) {
      if (this.addressForm.value[key]) {
        this.addressString = this.addressString + this.addressForm.value[key] + ', ';
      }
    }
  }
  confirm() {
    const orderList = this.cartItems.map((item: any) => {
      return {
        id: item.id,
        quantity: item.selectedQuantity,
        address: this.addressString,
        paymentType: this.paymentForm.value.paymentType,
        name: item.name,
        price: item.price
      }
    })
    this.loader = true;
    this.commonService.makeApiCall('/api/products/purchase', 'POST', { orderList }).subscribe((res: any) => {
      this.loader = false;
      if (res.errorcode === 0) {
        this.commonService.clearCart();
        this.router.navigate(['orders']);
      }
    }, (err) => {
      this.loader = false;
      console.log(err);
    })
  }
  pincodeInput(event) {
    const value = event.currentTarget.value;
    console.log(value);

    if ((event.keyCode < 97 || event.keyCode > 105 || (value)?.length > 5) && event.keyCode != 8 && event.keyCode != 9 && event.key != 'ArrowLeft' && event.key != 'ArrowRight') {
      event.preventDefault();
    }
  }
}
