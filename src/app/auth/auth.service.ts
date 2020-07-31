import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { AppConfig } from '../app-config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  }),withCredentials: true
  // observe: 'response' as 'response'
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiEndpoint = new AppConfig().apiEndpoint;
  //Server Endpoints
  private userUrl = `${this.apiEndpoint}api/users`;

  constructor(private http:HttpClient) { }

  //signup user
  signup(data):Observable<any>{
    return this.http.post(`${this.userUrl}`,data,httpOptions);
  }

  //signin
  signin(data):Observable<any>{
    return this.http.post(`${this.userUrl}/login`,data,httpOptions)
  }

  //verify user account
  VerifyAccount(token):Observable<any>{
    return this.http.put(`${this.userUrl}/${token}`,null,httpOptions);
  }

  //resend verification link
  resendVerificationEmail(body):Observable<any>{
    return this.http.put(`${this.userUrl}/resend_verification_email`,body,httpOptions);
  }

  //password reset link
  passwordResetLink(body):Observable<any>{
    return this.http.post(`${this.userUrl}/password_reset`,body,httpOptions);
  }

  //password reset
  passwordReset(body):Observable<any>{
    return this.http.put(`${this.userUrl}/password_reset/${body.token}`,body,httpOptions)
  }
   //isAuth
   isAuth():boolean{
    if (localStorage.getItem('x-auth-token')) {
      return true;
    }else{
      return false;
    } 
  }

  logout():Observable<any>{
    return this.http.get(`${this.userUrl}/logout`,httpOptions);
  }
}
