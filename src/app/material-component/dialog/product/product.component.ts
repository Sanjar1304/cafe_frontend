import { Component, EventEmitter,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm:any = FormGroup;
  dialogAction:any = 'Add';
  action: any = 'Add';
  responseMessage: any;
  categories:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
              private fb: FormBuilder,
              private productService: ProductService,
              private categoryService: CategoryService,
              public dialogRef: MatDialogRef<ProductComponent>,
              private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.productFormValidation();
  }

  productFormValidation(){
    this.productForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.productForm.patchValue(this.dialogData.dat);
    }
  }

  get name(){
    return this.productForm.get('name');
  }

  get categoryId(){
    return this.productForm.get('categoryId');
  }

  get price(){
    return this.productForm.get('price')
  }

  get description(){
    return this.productForm.get('description');
  }


  handleSubmit(){
    return this.dialogAction === 'Edit' ? this.edit() : this.add();
  }


  add(){}

  edit(){}


}
