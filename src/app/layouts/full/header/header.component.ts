import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ChangePasswordComponent } from 'src/app/material-component/dialog/change-password/change-password.component';
import { Component } from '@angular/core';
import { ConfirmationComponent } from 'src/app/material-component/dialog/confirmation/confirmation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  role: any;
  constructor(private router: Router,
              private dialog: MatDialog) {}

  logout(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.data = {
      message: 'Logout'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((user) => {
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/'])
    })
  }


  changePassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(ChangePasswordComponent, dialogConfig)
  }

}
