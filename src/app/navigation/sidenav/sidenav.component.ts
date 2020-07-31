import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { MainService } from 'src/app/main/main.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private AuthService:AuthService, private SharedService:SharedService, private router:Router, private MainService:MainService) { }
  isAuth;themeMode;
  ngOnInit(): void {
    this.SharedService.isAuth.subscribe((response)=>this.isAuth = response);
     if (localStorage.getItem('themeMode') == 'light'){
       this.themeMode = false;
     }else{
       this.themeMode = true;
     }
  }

  onCloseSidenav(){
    this.closeSidenav.emit();
  }

  onLogout(){
    this.AuthService.logout().subscribe((response)=>{
      if (response.success) {
        this.router.navigate(['signin']);
        this.onCloseSidenav();
        this.SharedService.isAuth.next(this.AuthService.isAuth());
      }
    });
  }

  onDarkModeToggle(){
    this.SharedService.darkModeToggler();
  }
}
