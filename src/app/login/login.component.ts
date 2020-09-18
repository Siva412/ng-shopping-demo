import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginErr:string = '';
  loader:boolean = false;
  constructor(private router: Router, private commonService: CommonService) { }

  ngOnInit(): void {
  }
  loginSubmit(form){
    this.loginErr = '';
    if(form.valid){
      this.loader = true
      this.commonService.makeApiCall('/api/user/login', 'POST', {...form.value}).subscribe((response:any) => {
        this.loader = false;
        if(response?.errorcode === 0){
          this.commonService.userLoggedIn(response.token, response.name);
          if(this.commonService.navigateTo){
            this.router.navigate([this.commonService.navigateTo]);
          }
          else{
            this.router.navigate(['home']);
          }
        }
        else{
          this.loginErr = response.message
        }
      }, (err) => {
        this.loader = false;
        this.loginErr = "Something went wrong"
      })
    }
  }
}
