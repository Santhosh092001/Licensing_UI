import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient : HttpClient) { }

  createProduct(product) : Observable<any>
  {
    return this._httpClient.post('Product/AddProduct', product);
  }

  getProduct() : Observable<any>
  {
    return this._httpClient.get('Product/GetProduct');
  }

  updateProduct(product) : Observable<any>
  {
    return this._httpClient.put('Product/UpdateProduct', product);
  }

  deleteProduct(id) : Observable<any>
  {
    return this._httpClient.delete(`Product/DeleteProduct?id=${id}`);
  }

  getProductsName() : Observable<any>
  {
    return this._httpClient.get('Product/getProductsName');
  }
  
}
