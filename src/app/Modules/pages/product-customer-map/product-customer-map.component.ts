import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../Services/product.service';
import { CustomerService } from '../../../../Services/customer.service';
import { ProductCustomerMapService } from '../../../../Services/product-customer-map.service';
import { NbDialogService } from '@nebular/theme';
import { AuthService } from '../../../../Services/auth.service';
import { ProductCustomerMap } from '../../../Models/ProductCustomerMap';

@Component({
  selector: 'ngx-product-customer-map',
  templateUrl: './product-customer-map.component.html',
  styleUrls: ['./product-customer-map.component.scss']
})
export class ProductCustomerMapComponent implements OnInit {

  productCustomerGroup : FormGroup
  headerValue = 'Update Product Customer Map'
  btnValue = 'Update'
  productsName  = [];
  customersName = [];
  ProductCutomerMaps : any;
  data: any;

  constructor(private _fb : FormBuilder, 
              private dialogService: NbDialogService,
              private _authService : AuthService,
              private _productService : ProductService,
              private _CustomerService : CustomerService, 
              private _ProductCustomerService : ProductCustomerMapService )
  {
    
    this.productCustomerGroup = _fb.group({
      ProductName : ['', Validators.required],
      CustomerName : ['', Validators.required]
    })

  }


  
  ngOnInit(): void {

    this.gets();
    this.getCustomersName();
    this.getProductsName();
  
  }

  gets()
  {
    this._ProductCustomerService.gets()
    .subscribe({
      next : (data) => 
      {
        this.ProductCutomerMaps = data;
        this.changeData(this.ProductCutomerMaps[0]);
      }
    })
  }


  createproductCustomer()
  {
    this._ProductCustomerService.createProductCustomer(this.productCustomerGroup.value)
    .subscribe({
      next : (data) => 
      {
        this._authService.showToast(data.message, 'success', 'bottom-end');
        this.gets();
      },error : (err) => {
        this._authService.showToast(err.error, 'danger', 'bottom-end');
      },
    })
  }

  updateproductCustomer()
  {
    const productCustomer = new ProductCustomerMap();
    productCustomer.Id = this.data.Id;
    productCustomer.CustomerId = this.data.CustomerId;
    productCustomer.ProductId = this.data.ProductId;
    this._ProductCustomerService.updateProductCustomer(productCustomer)
    .subscribe({
      next : (data) => 
      {
        this._authService.showToast(data.message, 'success', 'bottom-end');
        this.gets();
      },error : (err) => {
        this._authService.showToast(err.error, 'danger', 'bottom-end');
      },
    })
  }

  getProductsName()
  {
    this._productService.getProductsName()
    .subscribe({
      next : (data) => 
      {
        this.productsName = data;
      }
    })
  }

  getCustomersName()
  {
    this._CustomerService.getCustomersName()
    .subscribe({
      next : (data) => 
      {
        this.customersName = data;
      }
    })
  }

  addMap()
  {
    this.headerValue = 'Create Product Customer Map';
    this.btnValue = 'Create';
    this.productCustomerGroup.reset();
  }

  changeData(changedata)
  {
    this.headerValue = 'Update Product Customer Map';
    this.btnValue = 'Update';
    this.data = changedata
    this.productCustomerGroup.patchValue(changedata);
  }


  createOrUpdateproductCustomer(btnValue,ref)
  {
    if (btnValue == 'Create') {
      this.createproductCustomer();
    }
    else {
      this.updateproductCustomer();
    }
    ref.close(true);
  }


  clear(btnValue)
  {
    if (btnValue == 'Update') {
      this.productCustomerGroup.patchValue(this.data)
    }
    else {
      this.productCustomerGroup.reset();
    }
  }


  open(dialog: TemplateRef<any>, btnValue) {
    if(this.productCustomerGroup.valid)
    {
      if(btnValue == 'Create')
      {
        this.dialogService.open(dialog);
      }
      else
      {
        if(   this.data.ProductName != this.productCustomerGroup.value.ProductName 
          ||  this.data.CustomerName != this.productCustomerGroup.value.CustomerName  )
        {
          this.dialogService.open(dialog);
        }
        else
        {
          this._authService.showToast('Product Customer Map not Updated', 'danger', 'bottom-end')
        }
      }
    }
    else
    {
      this._authService.showToast('Enter Valid Product Customer Map Details', 'danger', 'bottom-end')
    }
  }



}
