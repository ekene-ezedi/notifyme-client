import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-channels',
  templateUrl: './my-channels.component.html',
  styleUrls: ['./my-channels.component.css']
})
export class MyChannelsComponent implements OnInit {
  channels;
  constructor(private MainService:MainService, private router:Router) { }

  ngOnInit(): void {
    this.MainService.getMyChannels().subscribe((response)=>{
      this.channels = response.channels;
    },(error)=>console.log(error));
  }

  onChannel(id){
    this.router.navigate(['channel',id]);
  }

  onCreateChannel(){
    this.router.navigate(['channel/create']);
  }
}
