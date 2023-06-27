import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PRODUCTS } from '../../../Models/User';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup
  headerValue = 'Update Product'
  btnValue = 'Update'
  products = PRODUCTS;
  // [
  //   {
  //     Name : 'Dell',
  //     Version : '8'
  //   },
  //   {
  //     Name : 'Sony',
  //     Version : '7'
  //   },
  //   {
  //     Name : 'Lenovo',
  //     Version : '9'
  //   },
  //   {
  //     Name : 'Sony',
  //     Version : '7'
  //   },
  //   {
  //     Name : 'Lenovo',
  //     Version : '9'
  //   }
  // ]

  constructor(private _fb: FormBuilder)
  {
    
    this.productForm = _fb.group({
      Name : ['', Validators.required],
      Version : ['', Validators.required]
    })
        
  }

  ngOnInit(): void {
    this.changeData(this.products[0]);
  }


  addProduct()
  {
    this.headerValue = 'Create Product';
    this.btnValue = 'Create';
    this.productForm.reset();
  }


  changeData(data)
  {
    this.headerValue = 'Update Product';
    this.btnValue = 'Update';
    this.productForm.patchValue(data);
  }

}
