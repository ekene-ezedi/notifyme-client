import { Component, OnInit } from '@angular/core';
import { MainService } from '../../main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { DeleteChannelComponent } from './delete-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  channel;user;channelId;isAdmin;selectedFile;bannerBg;
  constructor(private MainService:MainService, private route:ActivatedRoute, private router:Router, private SharedService:SharedService, private dialog:MatDialog) { }

  ngOnInit(): void {

    this.channelId = this.route.snapshot.params.id;
    this.user = this.SharedService.decodeToken().email;
    this.MainService.getChannel(this.channelId).subscribe((response)=>{
      this.channel = response.channel;
      this.isAdmin = this.SharedService.isAdmin(this.channel.admin._id);
    });

  }
  
  onSubscribe(){
    this.MainService.subscribe(this.channel._id).subscribe((response)=>{
      if (response.success) {
        this.channel.subscribers = response.channel.subscribers;
      }
    },(error)=>console.log(error));
  }

  onUnsubscribe(){
    this.MainService.unSubscribe(this.channel._id).subscribe((response)=>{
      if (response.success) {
        this.channel.subscribers = response.channel.subscribers;
      }
    },(error)=>console.log(error));
  }

  onEdit(){
  this.router.navigate(['channel/create'],{queryParams:{cid:this.channel._id},fragment:'update'});
  }

  onDelete(){
  const dialogRef = this.dialog.open(DeleteChannelComponent,{data:{
  name:this.channel.name
    }});

  dialogRef.afterClosed().subscribe((result)=>{
    if (result == "true"){
      this.MainService.deleteChannel(this.channel._id).subscribe((response)=>{
        if (response.success){
          this.SharedService.showSnackbar('Channel Deleted', null, 5000);
          this.router.navigate(['home/my-channels']);
        }
      },(error)=>console.log(error));
    }
  })
  }

  onCreateEvent(){
    this.router.navigate(['event/create',this.channelId]);
  }

  onUpload(event){
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.type == 'image/jpeg' || this.selectedFile.type == 'image/png') {
      const imgUpload = new FormData();
      imgUpload.append('image',this.selectedFile,this.selectedFile.name);
      this.MainService.uploadChannelbg(imgUpload,this.channel._id).subscribe((response)=>{
        this.channel.imgurl = response.image;
      },(error)=>console.log(error));
    }else{
       this.SharedService.showSnackbar('File must be an JPEG or PNG',null,5000);
    }
  }
}
