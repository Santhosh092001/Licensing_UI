import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CUSTOMERS } from '../../../Models/User';

@Component({
  selector: 'ngx-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerForm : FormGroup;
  headerValue = 'Update Customer'
  btnValue = 'Update'
  customers = CUSTOMERS;
  // [
  //   {
  //     Name : 'Santhosh',
  //     Email : 'santhosh@gmail.com',
  //     SPOC : 'spoc',
  //     Phone : '7834674556'
  //   },
  //   {
  //     Name : 'Rishi',
  //     Email : 'santhosh@gmail.com',
  //     SPOC : 'spoc',
  //     Phone : '7834674556'
  //   },
  //   {
  //     Name : 'Lokesh',
  //     Email : 'santhosh@gmail.com',
  //     SPOC : 'spoc',
  //     Phone : '7834674556'
  //   },
  //   {
  //     Name : 'Joseph',
  //     Email : 'santhosh@gmail.com',
  //     SPOC : 'spoc',
  //     Phone : '7834674556'
  //   },
  //   {
  //     Name : 'Mahesh',
  //     Email : 'santhosh@gmail.com',
  //     SPOC : 'spoc',
  //     Phone : '7834674556'
  //   }
  // ]

  constructor(private _fb : FormBuilder)
  {
    
    this.customerForm = _fb.group({
      Name : ['', Validators.required],
      SPOC : ['', Validators.required],
      Email : ['', [Validators.required, Validators.email]],
      Phone : ['', Validators.required],
    })

  }

  ngOnInit(): void {
    
    this.changeData(this.customers[0])
  }


  addCustomer()
  {
    this.headerValue = 'Create Customer';
    this.btnValue = 'Create';
    this.customerForm.reset();
  }


  changeData(data)
  {
    this.headerValue = 'Update Customer';
    this.btnValue = 'Update';
    this.customerForm.patchValue(data);
  }

}
