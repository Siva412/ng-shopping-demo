import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';
import { CustomValidators } from '../services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router, private commonService: CommonService, private customValidators: CustomValidators) {}
  regForm: FormGroup;
  hide: boolean = true;
  regErr: string = '';
  loader: boolean = false;
  ngOnInit(): void {
    this.regForm = this.fb.group({
      'firstName': ['', [Validators.required, Validators.pattern(/^[a-z0-9 ]+$/i), Validators.maxLength(20), this.customValidators.whiteSpaceValidator()]],
      'lastName': ['', [Validators.pattern(/^[a-z0-9 ]+$/i), Validators.maxLength(20), this.customValidators.whiteSpaceValidator()]],
      'email': ['', [Validators.required, Validators.email, this.customValidators.whiteSpaceValidator()]],
      'mobile': ['', [Validators.required, Validators.pattern(/^[6789]{1}\d{9}$/), this.customValidators.whiteSpaceValidator()]],
      'password': ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), this.customValidators.whiteSpaceValidator()]]
    });
  }
  registerSubmit(){
    this.regErr = '';
    if(this.regForm.valid){
      this.loader = true;
      this.commonService.makeApiCall('/api/user', 'POST', {...this.regForm.value}).subscribe((res:any) => {
        this.loader = false;
        if(res?.errorcode === 0){
          alert("Successfully registered");
          this.router.navigate(['']);
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
  canDeactivate(){
    if(this.regForm.dirty){
      return window.confirm("Discard changes?");
    }
    return true;
  }
}
