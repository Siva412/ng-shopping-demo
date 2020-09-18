import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './material-module/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { RatingComponent } from './rating/rating.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { CartComponent } from './cart/cart.component';
import { QuantArray } from './pipes/common.pipe';
import { ConfirmComponent } from './confirm/confirm.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ProdfilterComponent } from './prodfilter/prodfilter.component';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { OrdersComponent } from './orders/orders.component';
import { LoaderComponent } from './loader/loader.component';
import { AppInterceptor } from './services/app.interceptor';
import { OrderStatus } from './pipes/orderStatus.pipe';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { PincodeValid } from './directives/pincode.directive';
import { MobileValid } from './directives/mobile.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProductListComponent,
    ProductItemComponent,
    RatingComponent,
    ProductViewComponent,
    CartComponent,
    QuantArray,
    ConfirmComponent,
    SidenavComponent,
    ProdfilterComponent,
    FilterModalComponent,
    OrdersComponent,
    LoaderComponent,
    OrderStatus,
    ScrollTopComponent,
    PincodeValid,
    MobileValid
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
