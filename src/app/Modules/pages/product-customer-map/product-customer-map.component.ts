import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CUSTOMERS, PRODUCTS } from '../../../Models/User';

@Component({
  selector: 'ngx-product-customer-map',
  templateUrl: './product-customer-map.component.html',
  styleUrls: ['./product-customer-map.component.scss']
})
export class ProductCustomerMapComponent implements OnInit {

  productCustomerGroup : FormGroup
  headerValue = 'Update Product'
  btnValue = 'Update'
  product = PRODUCTS;
  customer = CUSTOMERS;
  productId = [] ;
  customerId = [] ;
  productCustomers = [
    {
      ProductId : 1,
      CustomerId : 5
    },
    {
      ProductId : 1,
      CustomerId : 5
    },
    {
      ProductId : 1,
      CustomerId : 5
    }
  ]

  constructor(private _fb : FormBuilder)
  {
    
    this.productCustomerGroup = _fb.group({
      ProductId : ['', [Validators.required, Validators.pattern("[0-9].{0,6}")]],
      CustomerId : ['', [Validators.required, Validators.pattern("[0-9].{0,6}")]]
    })

  }

  ngOnInit(): void {
    this.getProductId();
    this.getCustomerId();
    this.changeData(this.productCustomers[0]);
  }

  addMap()
  {
    this.headerValue = 'Create Product Customer Map';
    this.btnValue = 'Create';
    this.productCustomerGroup.reset();
  }

  changeData(data)
  {
    this.headerValue = 'Update Product Customer Map';
    this.btnValue = 'Update';
    this.productCustomerGroup.patchValue(data);
  }

  getProductId()
  {
    this.product.forEach(element => {
      this.productId.push(element.Id);
    });
  }

  getCustomerId()
  {
    this.customer.forEach(element => {
      this.customerId.push(element.Id);
    });
  }

}
