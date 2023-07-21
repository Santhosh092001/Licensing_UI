import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _httpClient : HttpClient) { }

  getCustomers() : Observable<any>
  {
    return this._httpClient.get('Customer/GetCustomer');
  }

  createCustomer(customer) : Observable<any>
  {
    return this._httpClient.post('Customer/AddCustomer', customer);
  }

  updateCustomer(updateCustomer) : Observable<any>
  {
    return this._httpClient.put('Customer/UpdateCustomer', updateCustomer);
  }

  deleteCustomer(customerId) : Observable<any>
  {
    return this._httpClient.delete(`Customer/DeleteCustomer?id=${customerId}`);
  }

  getCustomersName() : Observable<any>
  {
    return this._httpClient.get('Customer/getCustomersName');
  }

}
