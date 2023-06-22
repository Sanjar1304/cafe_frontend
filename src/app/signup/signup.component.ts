import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GlobalConstants } from '../shared/global-constant';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router'
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: any = FormGroup;
  responseMessage: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private snackBar: SnackbarService,
              private dailogRef: MatDialogRef<SignupComponent>,
              private ngxService: NgxUiLoaderService) { }


  ngOnInit(): void {
    this.signUpFormValidation();
  }


  signUpFormValidation(){
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: ['', [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: ['', [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    })
  }

  get name(){
    return this.signupForm.get('name');
  }

  get email(){
    return this.signupForm.get('email');
  }

  get contactNumber(){
    return this.signupForm.get('contactNumber');
  }

  get password(){
    return this.signupForm.get('password');
  }


  handleSubmit(){
    this.ngxService.start();
    var formData = this.signupForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password
    };
    this.userService.signup(data).subscribe((response:any) => {
      this.ngxService.stop();
      this.dailogRef.close();
      this.responseMessage = response?.message;
      this.snackBar.openSnackBar(this.responseMessage, '');
      this.router.navigate(['/']);
    },
    (error) => {
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
}
