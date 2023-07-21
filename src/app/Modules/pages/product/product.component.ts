import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { AuthService } from '../../../../Services/auth.service';
import { ProductService } from '../../../../Services/product.service';
import { Product } from '../../../Models/Product';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup
  headerValue = 'Update Product'
  btnValue = 'Update'
  productList: any;
  data: any;

  constructor(private _fb: FormBuilder,
              private dialogService: NbDialogService,
              private _authService : AuthService,
              private _productService : ProductService)
  {
    
    this.productForm = _fb.group({
      Name : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      Version : ['', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]]
    })
        
  }

  ngOnInit(): void {
    this.getProductList();
  }


  createProduct()
  {
    this._productService.createProduct(this.productForm.value)
    .subscribe({
      next : (data) => 
      {
        this._authService.showToast(data.message, 'success', 'bottom-end');
        this.getProductList();
      },error : (err) => {
        this._authService.showToast(err.error, 'danger', 'bottom-end');
      },
    })
  }


  updateProduct()
  {
    const product = new Product();
    product.Id = this.data.Id;
    product.Name = this.productForm.value.Name;
    product.Version = this.productForm.value.Version;
    this._productService.updateProduct(product)
    .subscribe({
      next : (data) => 
      {
        // console.log("Data : ", data);
        this._authService.showToast(data.message, 'success', 'bottom-end');
        this.getProductList();
      },error : (err) => {
        this._authService.showToast(err.error, 'danger', 'bottom-end');
      },
    })
  }


  getProductList()
  {
    this._productService.getProduct()
    .subscribe({
      next : (data) => 
      {
        this.productList = data;
        this.changeData(this.productList[0]);
        if (this.productList == 0) {
          this.headerValue = 'Create Product'
          this.btnValue = 'Create'
        }
      },error : (err) => {
        this._authService.showToast(err.error, 'danger', 'bottom-end');
      },
    })
  }



  addProduct()
  {
    this.headerValue = 'Create Product';
    this.btnValue = 'Create';
    this.productForm.reset();
  }


  changeData(changedata)
  {
    this.headerValue = 'Update Product';
    this.btnValue = 'Update';
    this.data = changedata
    this.productForm.patchValue(changedata);
  }


  createOrUpdateUser(btnValue,ref)
  {
    if (btnValue == 'Create') {
      this.createProduct();
    }
    else {
      this.updateProduct();
    }
    ref.close(true);
  }




  clear(btnValue)
  {
    if (btnValue == 'Update') {
      this.productForm.patchValue(this.data)
    }
    else {
      this.productForm.reset();
    }
  }


  open(dialog: TemplateRef<any>, btnValue) {
    if(this.productForm.valid)
    {
      if(btnValue == 'Create')
      {
        this.dialogService.open(dialog);
      }
      else
      {
        if(    this.data.Name != this.productForm.value.Name 
          ||  this.data.Version != this.productForm.value.Version  )
        {
          this.dialogService.open(dialog);
        }
        else
        {
          this._authService.showToast('Product not Updated', 'danger', 'bottom-end')
        }
      }
    }
    else
    {
      this._authService.showToast('Enter Valid Product Details', 'danger', 'bottom-end')
    }
  }


}
