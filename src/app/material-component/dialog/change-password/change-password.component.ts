import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GlobalConstants } from 'src/app/shared/global-constant';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm:any = FormGroup;
  responseMessage: any

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private snackbar: SnackbarService,
              public dialogRef: MatDialogRef<ChangePasswordComponent>,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.changePasswordFormValidation();
  }


  changePasswordFormValidation(){
    this.changePasswordForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    })
  }

  get oldPassword(){
    return this.changePasswordForm.get('oldPassword');
  }

  get newPassword(){
    return this.changePasswordForm.get('newPassword');
  }

  get confirmPassword(){
    return this.changePasswordForm.get('confirmPassword');
  }

  validateSubmit(){
    return (this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value) ? true : false;
  }

  handleChangePassword(){
    this.ngxService.start();
    var formData = this.changePasswordForm.value;
    let data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword
    }
    this.userService.changePassword(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snackbar.openSnackBar(this.responseMessage, 'success');
    }, (error) => {
      console.log(error);
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error?.error?.message;
      }else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

}
