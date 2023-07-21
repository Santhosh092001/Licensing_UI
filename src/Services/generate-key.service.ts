import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerateKeyService {

  constructor(private _httpClient : HttpClient) { }

  getProductCustomersDetails() : Observable<any>
  {
    return this._httpClient.get('GenerateKey/GetProductCustomerDetails');
  }

  getExcel() : Observable<any>
  {
    return this._httpClient.get('GenerateKey/GetExcel', { responseType : 'blob'});
  }

  decryptKey(key) : Observable<any>
  {
    return this._httpClient.get(`GenerateKey/DecryptedKey?encrytedKey=${key}&UseHashing=true`);
  }

}
