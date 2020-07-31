import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../main.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  public minDate = new Date(); event;
  constructor(private route:ActivatedRoute,private MainService:MainService,private SharedService:SharedService,private router:Router) { }

  ngOnInit(): void {
    this.MainService.getEvent(this.route.snapshot.params.id).subscribe((response)=>{
      this.event = response.event;
    },(error)=>console.log(error));
  }

  onSubmit(form:NgForm){
    // const channelId = this.route.snapshot.params.id;

    if (form.value.name == ""){
      form.value.name = this.event.name;
    }

    if (form.value.description == "") {
      form.value.description = this.event.description; 
    }

    if (form.value.time == "") {
      form.value.time = this.event.time
    }

    if (form.value.date == "") {
      form.value.date = this.event.date
    }

    if (form.value.venue == "") {
      form.value.venue = this.event.venue
    }

    //add time to date object
    let time = form.value.time.split(':');
    let date = new Date(form.value.date);
    date.setHours(time[0],time[1]);
    form.value.date = date;

    this.MainService.updateEvent(this.route.snapshot.params.id,form.value).subscribe((response)=>{
      if (response.success) {
        this.router.navigate(['event',response.event._id]);
      }
    },(error)=>console.log(error));
  }
}
