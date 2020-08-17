import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/main/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { NgForm } from '@angular/forms';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-channellist',
  templateUrl: './channellist.component.html',
  styleUrls: ['./channellist.component.css']
})
export class ChannellistComponent implements OnInit {

  constructor(private route:ActivatedRoute, private MainService:MainService, private router:Router, private SharedService:SharedService, private swPush:SwPush) { }
  channels;user;
  readonly publicVapidKey = "BPQPMcza9nW0xOxE8_hGCMSe0H-lpp4MMFv57kZldRFQ2i_wLCuJMcv1oRfmZXi88brXy5s0YNQXWyW5mreGAZk"

  ngOnInit(): void {
    let categories = this.route.snapshot.queryParams.cat;
    this.user = this.SharedService.decodeToken().email;
    
    this.MainService.getchanbycat(categories).subscribe((response)=>{
      this.channels = response.channels;
    });
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
        }
      },(error)=>console.log(error));
      // this.MainService.subscribe(this.channel._id,sub).subscribe((response)=>{},(err)=>{})
    })
    .catch((err)=>{console.error('Subscription failed',err)});
  }

  onUnsubscribe(channel,index){
    this.MainService.unSubscribe(channel._id).subscribe((response)=>{
      if (response.success) {
        this.channels[index].subscribers = response.channel.subscribers;
      }
    },(error)=>console.log(error));
  }

  onNext(){
    this.router.navigate(['home']);
  }

  onSearch(form:NgForm){
    this.MainService.search(form.value.search).subscribe((response)=>{
      this.channels = response.channels;
    },(error)=>console.log(error));
  }

}
