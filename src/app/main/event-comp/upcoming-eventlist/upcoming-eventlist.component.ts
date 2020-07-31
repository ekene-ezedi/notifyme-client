import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-upcoming-eventlist',
  templateUrl: './upcoming-eventlist.component.html',
  styleUrls: ['./upcoming-eventlist.component.css']
})
export class UpcomingEventlistComponent implements OnInit {
  public events = []; channelId;

  constructor(private MainService:MainService,private route:ActivatedRoute,private router:Router, public SharedService:SharedService) { }

  ngOnInit(): void {
    this.channelId = this.route.snapshot.params.id;
    let eventTabStatus = "upcoming";

    this.MainService.getEvents(this.channelId,eventTabStatus).subscribe((response)=>{
      this.events = response.events;
    },
      (error)=>console.log(error));
  }

  onEvent(id){
    this.router.navigate(['event',id]);
  }

  onCreateEvent(){
    this.router.navigate(['event/create',this.channelId]);
  }
}
