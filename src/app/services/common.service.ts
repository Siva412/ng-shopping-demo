import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs'
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { URL } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class CommonService {
    constructor(private httpClient: HttpClient) { }
    private cartSubject = new Subject();
    public cartItems: any = [];
    public purchaseItems: any = [];
    private loginFlag: boolean = false;
    private loginSubject = new Subject();
    private searchSubject = new Subject();
    private searchString = '';
    public userInfo: any;
    public navigateTo: string = '';
    onServiceLoad() {
        if (sessionStorage.getItem('cartItems')) {
            let cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
            this.cartItems = cartItems;
        }
        if(sessionStorage.getItem('token')){
            this.loginFlag = true;
        }
        if(sessionStorage.getItem('userInfo')){
            this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        }
    }
    getCartSubjectEmit() {
        return this.cartSubject.asObservable();
    }

    getCartSubject() {
        return this.cartSubject;
    }

    setCartItems(item) {
        this.cartItems.push(item);
        this.cartSubject.next(this.cartItems);
        sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
    removeCartItem(itemId) {
        this.cartItems = this.cartItems.filter(item => (item.id !== itemId));
        this.cartSubject.next(this.cartItems);
        sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
    updateCartItems(items){
        this.cartItems = items;
        this.cartSubject.next(this.cartItems);
        sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
    clearCart(){
        this.cartItems = [];
        this.cartSubject.next(this.cartItems);
        sessionStorage.removeItem('cartItems');
    }
    itemPresentInCart(id) {
        return this.cartItems.filter(item => (item.id === id))?.length;
    }
    setPurchaseItem(item){
        if(!this.itemPresentInCart(item.id)){
            this.purchaseItems.push(item);
        }
    }
    itemsPrice(): number {
        return this.getTotalItems().reduce((total, item) => (total + item.price), 0);
    }
    getTotalItems(){
        return [...this.cartItems, ...this.purchaseItems];
    }
    makeApiCall(url, method, data = null) {
        const apiUrl = URL + url;
        return this.httpClient.request(method, apiUrl, { body: data });
    }
    getLoginSubjectSub(){
        return this.loginSubject.asObservable();
    }
    getLoginFlag(){
        return this.loginFlag;
    }
    userLoggedIn(token, name) {
        this.loginFlag = true;
        sessionStorage.setItem('token', token);
        this.userInfo = {name};
        sessionStorage.setItem('userInfo', JSON.stringify({name}));
        this.loginSubject.next(this.loginFlag);
    }
    userLoggedOut(){
        this.loginFlag = false;
        this.userInfo = {};
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userInfo')
        this.loginSubject.next(this.loginFlag);
    }
    getSearchObs(){
        return this.searchSubject.asObservable();
    }
    getSearchSubject(){
        return this.searchSubject;
    }
    getSearchString(){
        return this.searchString;
    }
    setSearchString(str: string){
        this.searchString = str;
    }
}