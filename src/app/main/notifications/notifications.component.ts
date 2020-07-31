import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public events;
  constructor(private MainService:MainService, public SharedService:SharedService) { }

  ngOnInit(): void {
    this.MainService.getEventsAttending().subscribe((response)=>{
      this.events = response.events;
    },(error)=>console.log(error));
  }

}
