import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const localToken = localStorage.getItem('Token');
    const newRequest = request.clone({
      url : 'https://localhost:7093/' + request.url
      ,
      headers : request.headers.set('Authorization', `bearer ${localToken}`
      )
    })
    return next.handle(newRequest);
  }
}
