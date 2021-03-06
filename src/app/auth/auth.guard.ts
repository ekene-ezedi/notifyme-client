import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private SharedService:SharedService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (this.isAuth()) {
        return this.isAuth();
      }
      this.router.navigate(['signin']);
      this.SharedService.showSnackbar('You have to be logged in!',null,5000);
      return false;
  }

  
  //isAuth
  isAuth():boolean{
    if (localStorage.getItem('x-auth-token')) {
      return true;
    }else{
      return false;
    } 
  }
  
}
