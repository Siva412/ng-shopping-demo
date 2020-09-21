import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { CustomValidators } from '../services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('username', {static: true}) userNameControl: any;
  @ViewChild('password', {static: true}) passwordControl: any;
  loginErr:string = '';
  loader:boolean = false;
  constructor(private router: Router, private commonService: CommonService, private validations: CustomValidators) { }

  ngOnInit(): void {
    this.userNameControl.control.setValidators(this.validations.whiteSpaceValidator());
    this.passwordControl.control.setValidators(this.validations.whiteSpaceValidator());
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
