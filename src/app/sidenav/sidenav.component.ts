import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<void>();
  userName: string = '';
  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
    this.userName = this.commonService.userInfo?.name || 'User';
    this.commonService.getLoginSubjectSub().subscribe(() => {
      this.userName = this.commonService.userInfo?.name || 'User';
    })
  }
  navigateTo(url){
    if(!url){
      this.commonService.userLoggedOut();
    }
    this.router.navigate([url]);
    this.toggleMenu.emit();
  }
}
