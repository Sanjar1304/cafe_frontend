import { Component, EventEmitter, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any =  FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
              private fb: FormBuilder,
              private categoryService: CategoryService,
              public dialogRef: MatDialogRef<CategoryComponent>,
              private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.catergoryFormValidation();
  }


  catergoryFormValidation(){
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]]
    })

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.categoryForm.patchValue(this.dialogData.data)
    }
  }


  get name(){
    return this.categoryForm.get('name');
  }


  handleSubmit(){
    return this.dialogAction === 'Edit' ? this.edit() : this.add();
  }


  add(){
    var formData = this.categoryForm.value;
    var data = {
      name: formData.name
    }
    this.categoryService.addCategory(data).subscribe((response:any) => {
      this.dialogRef.close();
      this.onAddCategory.emit();
      this.responseMessage = response.message;
      this.snackbar.openSnackBar(this.responseMessage, 'success');
    }, (error) => {
      this.dialogRef.close();
      if(error.error.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.error)
    })
  }


  edit(){
    var formData = this.categoryForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name
    }
    this.categoryService.updateCategory(data).subscribe((response:any) => {
      this.dialogRef.close();
      this.onEditCategory.emit();
      this.responseMessage = response.message;
      this.snackbar.openSnackBar(this.responseMessage, 'success');
    }, (error) => {
      this.dialogRef.close();
      if(error.error.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.error)
    })
  }


}
