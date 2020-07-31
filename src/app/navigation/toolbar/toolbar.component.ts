import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth;
  constructor(private AuthService:AuthService, private SharedService:SharedService) { }

  ngOnInit(): void {
    this.SharedService.isAuth.subscribe((response)=>{
      this.isAuth = response;
    });
  }

  onToggleSidenav(){
    this.sidenavToggle.emit();
  }
}
