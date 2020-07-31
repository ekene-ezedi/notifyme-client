import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from '../../main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  public minDate;

  constructor(private MainService:MainService, private route:ActivatedRoute, private SharedService:SharedService, private router:Router) { }

  ngOnInit(): void {
    this.minDate = new Date();
  }

  onSubmit(form:NgForm){
    //add time to date object
    let time = form.value.time;
    time = time.split(':');
    let date = form.value.date;
    date.setHours(time[0],time[1]);
    const channelid = this.route.snapshot.params.id;
  
    this.MainService.createEvent(channelid,form.value).subscribe((response)=>{
      if (response.success) {
        this.SharedService.showSnackbar(`${response.event.name} was created successfully`, null, 10000);
        this.router.navigate(['event',response.event._id]);
      }
    },(error)=>console.log(error));
  }
}
