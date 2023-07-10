import { Component, OnInit } from '@angular/core';

import { GlobalConstants } from 'src/app/shared/global-constant';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'categoryName', 'description', 'price', 'edit'];
  dataSource: any;
  responseMessage: any;

  constructor(private ngxService: NgxUiLoaderService,
              private productService: ProductService,
              private dialog: MatDialog,
              private snackbar: SnackbarService,
              private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData(){
    this.productService.getAllProducts().subscribe((response: any) => {
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    }, (error) => {
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }


  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(){}

}
