import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { AuthService } from '../../../../Services/auth.service';
import { CustomerService } from '../../../../Services/customer.service';
import { Customer } from '../../../Models/Customer';

@Component({
  selector: 'ngx-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerForm : FormGroup;
  headerValue = 'Update Customer'
  btnValue = 'Update'
  customerList : any;
  data: any;


  constructor(private _fb : FormBuilder,
              private dialogService: NbDialogService,
              private _authService : AuthService,
              private _custService : CustomerService)
  {
    
    this.customerForm = _fb.group({
      Name : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      SPOC : ['', [Validators.required, Validators.maxLength(20), Validators.minLength(5)]],
      Email : ['', [Validators.required, Validators.email]],
      Phone : ['', [Validators.required, Validators.minLength(10)]],
    })

  }

  ngOnInit(): void {
    this.getCustomers();
  }



  createCustomer()
  {
    this._custService.createCustomer(this.customerForm.value)
    .subscribe({
      next : (data) => 
      {
        this._authService.showToast(data.message, 'success', 'bottom-end')
        this.getCustomers();
      },error : (err) => {
        this._authService.showToast(err.error, 'danger', 'bottom-end');
      },
    })
  }


  updateCustomer()
  {
    const customer = new Customer();
    customer.Id = this.data.Id;
    customer.Name = this.customerForm.value.Name
    customer.SPOC = this.customerForm.value.SPOC
    customer.Email = this.customerForm.value.Email
    customer.Phone = this.customerForm.value.Phone
    this._custService.updateCustomer(customer)
    .subscribe({
      next : (data) => 
      {
        this._authService.showToast(data.message, 'success', 'bottom-end')
        this.getCustomers();
      },error : (err) => {
        // console.log("Error : ", err);
        this._authService.showToast(err.error, 'danger', 'bottom-end');
      },
    })
  }


  getCustomers()
  {
    this._custService.getCustomers()
    .subscribe({
      next : (data) => 
      {
        this.customerList = data;
        this.changeData(this.customerList[0]);
        if (this.customerList == 0) {
          this.headerValue = 'Create Customer'
          this.btnValue = 'Create'
        }
      },error : (err) => {
        this._authService.showToast(err.error, 'danger', 'bottom-end');
      },
    })
  }


  addCustomer()
  {
    this.headerValue = 'Create Customer';
    this.btnValue = 'Create';
    this.customerForm.reset();
  }


  changeData(changedata)
  {
    this.headerValue = 'Update Customer';
    this.btnValue = 'Update';
    this.data = changedata;
    // console.log("Change Data : ", changedata);
    // console.log("Data : ", this.data);
    this.customerForm.patchValue(changedata);
  }



  createOrUpdateUser(btnValue,ref)
  {
    if (btnValue == 'Create') {
      this.createCustomer();
    }
    else {
      this.updateCustomer();
    }
    ref.close(true);
  }



  clear(btnValue)
  {
    if (btnValue == 'Update') {
      this.customerForm.patchValue(this.data)
    }
    else {
      this.customerForm.reset();
    }
  }


  open(dialog: TemplateRef<any>, btnValue) {
    if(this.customerForm.valid)
    {
      if(btnValue == 'Create')
      {
        this.dialogService.open(dialog);
      }
      else
      {
        if(   this.data.Name != this.customerForm.value.Name 
          ||  this.data.SPOC  != this.customerForm.value.SPOC
          ||  this.data.Email != this.customerForm.value.Email
          ||  this.data.Phone != this.customerForm.value.Phone  )
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
