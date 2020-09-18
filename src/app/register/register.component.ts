import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router, private commonService: CommonService) {}
  regForm: FormGroup;
  hide: boolean = true;
  regErr: string = '';
  loader: boolean = false;
  ngOnInit(): void {
    this.regForm = this.fb.group({
      'firstName': ['', [Validators.required, Validators.pattern(/^[a-z0-9 ]+$/i), Validators.maxLength(20)]],
      'lastName': ['', [Validators.pattern(/^[a-z0-9 ]+$/i), Validators.maxLength(20)]],
      'email': ['', [Validators.required, Validators.email]],
      'mobile': ['', [Validators.required, Validators.pattern(/^[6789]{1}\d{9}$/)]],
      'password': ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/)]]
    });
  }
  registerSubmit(){
    this.regErr = '';
    if(this.regForm.valid){
      this.loader = true;
      this.commonService.makeApiCall('/api/user', 'POST', {...this.regForm.value}).subscribe((res:any) => {
        this.loader = false;
        if(res?.errorcode === 0){
          alert("Successfully registered")
        }
        else{
          this.regErr = res.message
        }
      }, (err) => {
        this.loader = false;
        this.regErr = err?.error?.message || "Sorry something went wrong"        
      })
    }
  }
  gotoLogin(){
    this.router.navigate(['']);
  }
}
