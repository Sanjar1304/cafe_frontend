import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';

import { DashboardService } from '../services/dashboard.service';
import { GlobalConstants } from '../shared/global-constant';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements AfterViewInit {

  responseMessage: any;
  data: any;

	ngAfterViewInit() { }

	constructor(private dashboardService: DashboardService,
              private ngxService: NgxUiLoaderService,
              private snackBar: SnackbarService) {
                this.ngxService.start();
                this.dashboardData();
              }

  dashboardData(){
    this.dashboardService.getDetails().subscribe((response: any) => {
      this.ngxService.stop();
      this.data = response;
    }, (error:any) => {
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error)
    })
  }
}
