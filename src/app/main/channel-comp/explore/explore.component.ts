import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  channels;user = this.SharedService.decodeToken().email;
  constructor(private MainService:MainService, private router:Router, private SharedService:SharedService) { }

  ngOnInit(): void {
    this.MainService.getChannels().subscribe((response)=>{
      this.channels = response.channels;
    },(error)=>{console.log(error)});
  }

  onChannel(id){
    this.router.navigate(['channel',id]);
  }
  onSubscribe(channel,index){
    this.MainService.subscribe(channel._id).subscribe((response)=>{
      if (response.success) {
        this.channels[index].subscribers = response.channel.subscribers;
      }
    },(error)=>console.log(error));
  }
  onUnsubscribe(){}

  onSearch(form:NgForm){
    this.MainService.search(form.value.search).subscribe((response)=>{
      this.channels = response.channels;
    },(error)=>console.log(error));
  }

}
