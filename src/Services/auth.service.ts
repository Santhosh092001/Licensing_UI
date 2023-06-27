import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // url:string = 'https://localhost:7093/'

  constructor(private _httpClient:HttpClient,
    private toastrService: NbToastrService)
  {
  }

  showToast(message: string, color: string, position) {
    this.toastrService.show('',
      message,
      { duration: 3000, status: color, position, icon: '' });
  }


  GetDecodeJwtToken(token : any)
  {
    const helper = new JwtHelperService();
    return helper.decodeToken(token);
  }

  isLogin()
  {
    return !!localStorage.getItem('Token');
  }

  jwtAuthentication(user:any) : Observable<any>
  {
    return this._httpClient.post('Authenticate',user);
  }

  createUser(newUser:any) : Observable<any>
  {
    return this._httpClient.post('User/CreateUser',newUser)
  }

  updateUser(updateuser:any) : Observable<any>
  {
    return this._httpClient.put('User/UpdateUser',updateuser)
  }

  getAllUser() : Observable<any>
  {
    return this._httpClient.get('User/GetUserDetails');
  }

  getUsersList()
  {
    return this._httpClient.get('User/GetUserList');
  }

}
