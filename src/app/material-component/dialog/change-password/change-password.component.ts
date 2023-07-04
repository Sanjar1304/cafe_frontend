import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  validateSubmit(){
   (this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value) ? true : false;
  }

  handleChangePassword(){

  }

}
