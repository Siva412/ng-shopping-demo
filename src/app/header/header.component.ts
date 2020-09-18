import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<void>();
  cartItems: number = 0;
  isLoginIn: boolean = false;
  cartFlag: boolean = false;
  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = this.commonService.cartItems?.length;
    this.isLoginIn = this.commonService.getLoginFlag();
    this.commonService.getCartSubject().subscribe((data: any) => {
      this.cartItems = data.length;
    });
    this.commonService.getLoginSubjectSub().subscribe((data: any) => {
      this.isLoginIn = data;
    })
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        if(event.url === '/' || event.url === '/register'){
          this.cartFlag = false;
        }
        else{
          this.cartFlag = true;
        }
      }
    })
  }
  gotoCart() {
    this.router.navigate(['cart']);
  }
  gotoHome() {
    this.router.navigate(['home'])
  }
  menuClick() {
    this.toggleMenu.emit();
  }
  logout() {
    this.commonService.userLoggedOut();
    this.router.navigate(['']);
  }
}
