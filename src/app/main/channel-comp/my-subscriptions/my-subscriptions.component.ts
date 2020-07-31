import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.css']
})
export class MySubscriptionsComponent implements OnInit {
 public channels;
  constructor(private MainService:MainService, private router:Router) { }

  ngOnInit(): void {
    this.MainService.getSubscriptions().subscribe((response)=>{
      this.channels = response.channels
    },(error)=>console.log(error))
  }

  onChannel(id){
    this.router.navigate(['channel',id]);
  }

  onUnsubscribe(channel,index){
    this.MainService.unSubscribe(channel._id).subscribe((response)=>{
      if (response.success) {
        this.channels.splice(index,1);
      }
    },(error)=>console.log(error));
  }
}
