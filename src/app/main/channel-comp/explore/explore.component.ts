import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { NgForm } from '@angular/forms';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  channels;user = this.SharedService.decodeToken().email;
  readonly publicVapidKey = "BPQPMcza9nW0xOxE8_hGCMSe0H-lpp4MMFv57kZldRFQ2i_wLCuJMcv1oRfmZXi88brXy5s0YNQXWyW5mreGAZk"
  constructor(private MainService:MainService, private router:Router, private SharedService:SharedService, private swPush:SwPush) { }

  ngOnInit(): void {
    this.MainService.getChannels().subscribe((response)=>{
      this.channels = response.channels;
    },(error)=>{console.log(error)});
  }

  onChannel(id){
    this.router.navigate(['channel',id]);
  }
  onSubscribe(channel,index){
    //request subscription
    this.swPush.requestSubscription({serverPublicKey:this.publicVapidKey})
    .then(sub=>{
      this.MainService.subscribe(channel._id,sub).subscribe((response)=>{
        if (response.success) {
          this.channels[index].subscribers = response.channel.subscribers;
          console.log(response)
        }
      },(error)=>console.log(error));
      // this.MainService.subscribe(this.channel._id,sub).subscribe((response)=>{},(err)=>{})
    })
    .catch((err)=>{console.error('Subscription failed',err)});
  }
  onUnsubscribe(){}

  onSearch(form:NgForm){
    this.MainService.search(form.value.search).subscribe((response)=>{
      this.channels = response.channels;
    },(error)=>console.log(error));
  }

}
