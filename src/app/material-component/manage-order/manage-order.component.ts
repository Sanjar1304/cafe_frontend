import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total', 'edit'];
  dataSource: any = [];
  manageOrderForm: any = FormGroup;
  categoryList: any = [];
  products: any = [];
  price: any;
  totalAmount: number = 0;
  responseMessage: any;

  constructor(private ngxService: NgxUiLoaderService,
              private billService: BillService,
              private categoryService: CategoryService,
              private productService: ProductService,
              private snackBar: SnackbarService,
              private dialog: MatDialog,
              private fb: FormBuilder) { }


  ngOnInit(): void {
    this.ngxService.start();
    this.manageOrderFormValidation();
  }


  manageOrderFormValidation(){
    this.manageOrderForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      paymentMethod: [null, [Validators.required]],
      product: [null, [Validators.required]],
      category: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      price: [null, [Validators.required]],
      total: [0, [Validators.required]],
    })
  }










}
