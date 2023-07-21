import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCustomerMapService {

  constructor(private _httpClient : HttpClient) { }

  getProductCustomer() : Observable<any>
  {
    return this._httpClient.get('ProductCustomerMap/Get');
  }

  createProductCustomer(productCustomer) : Observable<any>
  {
    return this._httpClient.post('ProductCustomerMap/CreateProductCustomerMap', productCustomer);
  }

  updateProductCustomer(updateProductCustomer) : Observable<any>
  {
    return this._httpClient.put('ProductCustomerMap/UpdateProductCustomerMap', updateProductCustomer);
  }

  getProductCustomersId() : Observable<any>
  {
    return this._httpClient.get('ProductCustomerMap/GetProductCustomersId');
  }


  gets() : Observable<any>
  {
    return this._httpClient.get('ProductCustomerMap/Gets');
  }


  // ---------------- Generate Key ---------------

  generateKey(key) : Observable<any>
  {
    return this._httpClient.post('GenerateKey/EncryptKey', key);
  }

}
