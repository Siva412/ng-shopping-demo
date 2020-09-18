import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { OrdersComponent } from './orders/orders.component';
import { RouteGuard } from './services/routeguard.service';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home', component: HomeComponent,
    children: [{
      path: '', component: ProductListComponent
    },
    {
      path: 'prodview', component: ProductViewComponent
    }]
  },
  { path: 'cart', component: CartComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'confirm', component: ConfirmComponent, canActivate: [RouteGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [RouteGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
