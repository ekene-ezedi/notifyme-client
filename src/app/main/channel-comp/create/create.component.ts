import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../main.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  categories;
  updateStatus:boolean = false;
  channel;
  constructor(private route:ActivatedRoute, private MainService:MainService, private SharedService:SharedService, private router:Router) { }
  
  ngOnInit(): void {
    let cid = this.route.snapshot.queryParams.cid;
    let update = this.route.snapshot.fragment;
    if (cid && update) {
      this.updateStatus = true;
      this.MainService.getChannel(cid).subscribe((response)=>{
        this.channel = response.channel;
      },(error)=>console.log(error));
    }
    this.MainService.getCategories().subscribe((response)=>{
      this.categories = response
    });
  }

  onSubmit(form:NgForm){
    this.MainService.createChannel(form.value).subscribe((response)=>{
      if (response.success) {
        this.SharedService.showSnackbar('Channel Created',null,10000);
        this.router.navigate(['channel', response.channel._id]);
      }
    }, (error)=>{
      this.SharedService.showSnackbar(error.msg,null,5000)
    });
  }

  onUpdate(form:NgForm){
    if (form.value.name == ""){
      form.value.name = this.channel.name;
    }

    if (form.value.description == "") {
      form.value.description = this.channel.description; 
    }

    if (form.value.category == "") {
      form.value.category = this.channel.category
    }

    this.channel.name = form.value.name;
    this.channel.description = form.value.description;
    this.channel.category = form.value.category; 

    this.MainService.updateChannel(this.channel).subscribe((response)=>{
      if (response.success) {
        this.SharedService.showSnackbar('Channel Updated!', null, 5000);
        this.router.navigate(['channel',response.channel._id]);
      }
    },(error)=>console.log(error))
  }

}