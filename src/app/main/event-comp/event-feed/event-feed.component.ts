import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { SharedService } from 'src/app/shared/shared.service';
import { EventStateService } from '../event-state.service';

@Component({
  selector: 'app-event-feed',
  templateUrl: './event-feed.component.html',
  styleUrls: ['./event-feed.component.css']
})
export class EventFeedComponent implements OnInit {

  public events;

  constructor(private MainService:MainService, private EventState:EventStateService, public SharedService:SharedService) { }

  ngOnInit(): void {

    this.EventState.events.subscribe((events)=>{
      this.events = events;
    });

    this.MainService.getEventsBySubscription().subscribe((response)=>{
      this.EventState.events.next(response.events)
    },(error)=>console.log(error));
  }

  onLike(event,id){
    this.MainService.like(event._id).subscribe((response)=>{
      if (response.success){
        this.events[id].likes = response.event.likes;
      }
    },(error)=>console.log(error));
  }

}
