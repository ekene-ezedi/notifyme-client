import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader/loader.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(public LoaderService:LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('x-auth-token')
    this.LoaderService.show();
    if (token !== null){
      request = request.clone({
        setHeaders:{'x-auth-token':token}
      });
    }
    return next.handle(request).pipe(finalize(()=>this.LoaderService.hide()));
  }
}
