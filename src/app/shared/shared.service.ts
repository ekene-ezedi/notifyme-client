import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MainService } from '../main/main.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private snackbar:MatSnackBar, private AuthService:AuthService,private MainService:MainService) { }
  showSnackbar(message,action,duration){
    this.snackbar.open(message,action,{duration});
  }

  isAuth = new BehaviorSubject<any>(this.AuthService.isAuth());
  public themeMode = new BehaviorSubject<any>(localStorage.getItem('themeMode'));


      formatAMPM(date){
      date = new Date(date);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      
      let ampm = hours >= 12 ? 'PM' : 'AM';
      
      hours = hours % 12;
      hours = hours ? hours : 12;
      
      minutes = minutes < 10 ? '0'+minutes : minutes;
      
      let strTime = hours + ':' + minutes + ' ' + ampm;
      
      return strTime;    
  }
  decodeToken(){
    let decoded = JSON.parse(atob(document.cookie.split('.')[1]));
    return decoded;
  }

  isAdmin(adminId){
    if (adminId !== this.decodeToken()._id) {
      return false;
    }
    return true
  }

  truncateTxt(p){
    if (p.length > 80) {
      return p.substring(0,80) + '...';    
    }
    return p;
  }

  darkModeToggler(){
    let themeMode = localStorage.getItem("themeMode")
    if (themeMode == 'light') {
      localStorage.setItem('themeMode','dark');
      themeMode = localStorage.getItem("themeMode");
      this.themeMode.next(themeMode);
    }else{
      localStorage.setItem('themeMode','light');
      themeMode = localStorage.getItem("themeMode");
      this.themeMode.next(themeMode);
    }
  }
}
