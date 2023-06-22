import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GlobalConstants } from '../shared/global-constant';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: any = FormGroup;
  responseMessage: any;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private snackbar: SnackbarService,
              private dialogRef: MatDialogRef<ForgotPasswordComponent>,
              private ngxService: NgxUiLoaderService){ }

  ngOnInit(): void {
    this.forgotPasswordFormValidation();
  }



  forgotPasswordFormValidation(){
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]]
    })
  }

  get email(){
    return this.forgotPasswordForm.get('email');
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.forgotPasswordForm.value;
    var data = {
      email: formData.email
    }
    this.userService.forgotPassword(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snackbar.openSnackBar(this.responseMessage, '');
    }, (error) => {
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error?.error?.message;
      }else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.error)
    })
  }
}
