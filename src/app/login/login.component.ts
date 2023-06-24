import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GlobalConstants } from '../shared/global-constant';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm: any = FormGroup;
  responseMessage: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private userService: UserService,
              private snackbar: SnackbarService,
              private dialogRef: MatDialogRef<LoginComponent>,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.loginFormValidation();
  }

  loginFormValidation(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]]
    })
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password')
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    this.userService.login(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.dialogRef.close();
      this.responseMessage = response?.message;
      this.snackbar.openSnackBar(this.responseMessage, '');
      this.router.navigate(['/login']);
    }, (error) => {
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

}
