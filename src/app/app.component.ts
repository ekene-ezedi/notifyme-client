import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { SharedService } from './shared/shared.service';


import { SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Notifyme';
  public initial:boolean;
  public final:boolean;
  public themeMode:string;

  constructor(private SharedService:SharedService, private AuthService:AuthService, private update:SwUpdate) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initial = true;
    this.final = false;

    if (localStorage.getItem('themeMode') == null){
      localStorage.setItem('themeMode','light');
      this.themeMode = 'light'
    }
    
    this.SharedService.themeMode.subscribe((value)=>{
      this.themeMode = value;
    });

    //service worker update
    if (this.update.isEnabled) {
      this.update.available.subscribe(()=>{
        window.location.reload()
      });
    }
  }
}
