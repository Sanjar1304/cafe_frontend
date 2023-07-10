import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
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
    // this.ngxService.start();
    this.tableData();
  }

  tableData(){

  }

}
