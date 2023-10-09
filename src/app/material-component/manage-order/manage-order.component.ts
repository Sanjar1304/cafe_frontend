import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BillService } from 'src/app/services/bill.service';
import { CategoryService } from 'src/app/services/category.service';
import { GlobalConstants } from 'src/app/shared/global-constant';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
              private fb: FormBuilder) { }


  ngOnInit(): void {
    this.ngxService.start();
    this.getCategory();
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
  };


  get name(){
    return this.manageOrderForm.get('name')
  }

  get email(){
    return this.manageOrderForm.get('email')
  }

  get contactNumber(){
    return this.manageOrderForm.get('contactNumber')
  }

  get paymentMethod(){
    return this.manageOrderForm.get('paymentMethod')
  }

  get product(){
    return this.manageOrderForm.get('product')
  }

  get category(){
    return this.manageOrderForm.get('category')
  }

  get quantity(){
    return this.manageOrderForm.get('quantity')
  }

  get priceForm(){
    return this.manageOrderForm.get('price')
  }

  get total(){
    return this.manageOrderForm.get('total')
  }



  getCategory(){
    this.categoryService.getCategory().subscribe((response: any) => {
      this.ngxService.stop();
      this.categoryList = response;
    }, (error: any) => {
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }



  getProductsByCategory(value: any){
    this.productService.getProductsByCategory(value.id).subscribe((response:any) => {
      this.products = response;
      this.manageOrderForm.controls['price'].setValue('');
      this.manageOrderForm.controls['quantity'].setValue('');
      this.manageOrderForm.controls['total'].setValue(0);
    }, (error) => {
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }



  getProductDetails(value: any){
    this.productService.getByID(value.id).subscribe((response: any) => {
      this.price = response.price;
      this.manageOrderForm.controls['price'].setValue(response.price);
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(this.price * 1);
    }, (error: any) => {
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error)
    })
  }


  setQuantity(value: any){
    var temp = this.manageOrderForm.controls['quantity'].value;
    if(temp > 0){
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    }else if(temp != ''){
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    }
  }


  validateProductAdd(){
    return this.manageOrderForm.controls['total'].value === 0 || this.manageOrderForm.controls['total'].value === null || this.manageOrderForm.controls['quantity'].value <= 0 ? true : false;
  }



  validateSubmitBtn(){
    if(this.totalAmount === 0 ||
      this.manageOrderForm.controls['name'].value === null ||
      this.manageOrderForm.controls['email'].value === null ||
      this.manageOrderForm.controls['contactNumber'].value === null ||
      this.manageOrderForm.controls['paymentMethod'].value === null ||
      !(this.manageOrderForm.controls['contactNumber'].valid) ||
      !(this.manageOrderForm.controls['email'].valid)){
        return true
    }else {
        return false
    }
  }


  add(){
    var formData = this.manageOrderForm.value;
    var productName = this.dataSource.find((el: {id:number}) => el.id == formData.product.id);
    if(productName === undefined){
      this.totalAmount = this.totalAmount + formData.total;
      this.dataSource.push({
        id: formData.product.id,
        name: formData.product.name,
        category: formData.category.name,
        quantity: formData.quantity,
        price: formData.price,
        total: formData.total
      });
      this.dataSource = [...this.dataSource];
      this.snackBar.openSnackBar(GlobalConstants.productAdded, 'success');
    }else{
      this.snackBar.openSnackBar(GlobalConstants.productExistError, GlobalConstants.error)
    }
  }


  handleDeleteAction(value: any, element: any){
    this.totalAmount = this.totalAmount - element.total;
    this.dataSource.splice(value, 1);
    this.dataSource = [...this.dataSource];
  }



  submitAction(){
    this.ngxService.start();
    var formData = this.manageOrderForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      totalAmount: this.totalAmount,
      productDetails: JSON.stringify(this.dataSource)
    };

    this.billService.generateReport(data).subscribe((response:any) => {
      this.downloadFile(response?.uuid);
      this.manageOrderForm.reset();
      this.dataSource = [];
      this.totalAmount = 0;
    }, (error:any) => {
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error)
    })
  }



  downloadFile(fileName: any){
    var data = {
      uuid: fileName
    };
    this.billService.getPdfReport(data).subscribe((response: any) => {
      saveAs(response, fileName + '.pdf');
      this.ngxService.stop();
    })
  }



}
