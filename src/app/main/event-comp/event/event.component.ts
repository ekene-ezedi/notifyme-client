import { Component, OnInit } from '@angular/core';
import { trigger,state,style,transition, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from '../../main.service';
import { SharedService } from 'src/app/shared/shared.service';
import { NgForm } from '@angular/forms';
import { EventStateService } from '../event-state.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  animations:[
    trigger('guestState',[
      state('prev',style({
        opacity:1
      })),
      state('next',style({
        opacity:1
      })),
      transition('prev <=> next',animate(600, style({
        opacity:0
      })))
    ])
  ],
})
export class EventComponent implements OnInit {

  public event;guest; isAdmin:boolean = false; toggleGuestForm:boolean = false; index:number = 0; animateState:string = 'prev'; updateGuest:boolean = false;selectedFile;bg;
  
  constructor(private MainService:MainService,private route:ActivatedRoute, private router:Router , public SharedService:SharedService, private EventState:EventStateService) { }

  ngOnInit(): void {
    //retrieve event id
    const eventId = this.route.snapshot.params.id;

    this.EventState.event.subscribe((event)=>{
      //update Event property from state
        this.event = event;
  
        //check if user created this event
        this.isAdmin = this.SharedService.isAdmin(this.event.admin._id);
        this.guest = this.event.guests[0];
  
        //format time
        this.event.time = this.SharedService.formatAMPM(this.event.date);

    this.bg = encodeURI(this.event.imgurl)
      });

    this.MainService.getEvent(eventId).subscribe((response)=>{
      if (response.success) {
        //update state
        this.EventState.event.next(response.event);
      }
    },(error)=>console.log(error));

  }

  //guest animation
  onAnimate(){
    return this.animateState == 'prev' ? this.animateState = 'next' : this.animateState = 'prev';
  }

  onPrev(){
    if (this.index == 0) {
        this.onAnimate();
        this.index = this.event.guests.length-1;
        this.guest = this.event.guests[this.index];
    }else{
      this.onAnimate();
      this.index--;
      this.guest = this.event.guests[this.index];
    }
  }

  onNext(){
    if (this.index < this.event.guests.length-1) {
      this.onAnimate();
      this.index++;
      this.guest = this.event.guests[this.index];
    }else{
      this.onAnimate();
      this.index = 0;
      this.guest = this.event.guests[this.index];
    }
  }



  getIndex(i){
    return this.index == i ? 'blue' : 'grey'
  }
  onSave(form:NgForm){
    form.value.img = 'https://res.cloudinary.com/dz3c3h3jx/image/upload/v1596669125/assets/ic_person_outline_black_48dp_nfimoe.png';
    this.event.guests.push(form.value);
    this.MainService.addGuest(this.event._id,this.event.guests).subscribe((response)=>{
    if (response.success){
      //update state
      this.EventState.event.next(response.event);
      //hide form
      this.toggleGuestForm = false;

      this.SharedService.showSnackbar('Guest added',null,500);
      
    }
  },(error)=>console.log(error))
  }

  onGoing(){
    this.MainService.attendEvent(this.route.snapshot.params.id).subscribe((response)=>{
      if (response.success) {
      this.event.attendees = this.event.attendees + 1;
      }
    }
      ,(error)=>console.log(error));
  }

  onEdit(){
    this.router.navigate([`event/update/${this.event._id}`]);
  }

  onDelete(){
    this.MainService.deleteEvent(this.event._id).subscribe((response)=>{
      if (response.success) {
        this.SharedService.showSnackbar('Event deleted',null,5000);
        this.router.navigate(['channel',this.event.channelId]);
      }
    },(error)=>console.log(error));
  }

  onUpdateGuestToggle(){
    this.updateGuest == false ? this.updateGuest = true : this.updateGuest = false;
  }

  onUpdateGuest(form:NgForm, index){
    if (form.value.name == ""){
      form.value.name = this.event.guests[index].name;
    }else{
      this.event.guests[index].name = form.value.name;
    }

    if (form.value.role == ""){
      form.value.role = this.event.guests[index].role;
    }else{
      this.event.guests[index].role = form.value.role;
    }
    
    this.MainService.updateGuests(this.route.snapshot.params.id,this.event.guests).subscribe((response)=>{
      if (response.success) {
          this.EventState.event.next(response.event);
          this.updateGuest = false;
          this.SharedService.showSnackbar('Update successful',null,5000);
      }
    },(error)=>console.log(error));
  }

  onDeleteGuest(index){
    let guestId = this.event.guests[index]._id;
    this.MainService.deleteGuest(this.route.snapshot.params.id,guestId).subscribe((response)=>{
      if (response.success) {
        this.EventState.event.next(response.event);
        this.updateGuest = false;
        this.SharedService.showSnackbar('Guest deleted',null,5000)
      };
    },(error)=>console.log(error));
  }

  onUpload(event,form:NgForm){
    this.selectedFile = event.target.files[0];

    if (this.selectedFile.type == 'image/jpeg' || this.selectedFile.type == 'image/png') {
      const imgUpload = new FormData();
      imgUpload.append('image',this.selectedFile,this.selectedFile.name);
      this.MainService.uploadEventbg(imgUpload,this.event._id).subscribe((response)=>{
        this.event.imgurl = response.image;
      },(error)=>{console.log(error)});
    }else{
       this.SharedService.showSnackbar('File must be a JPEG or PNG',null,5000);
    }
    form.reset()
  }

  onNotifySubscribers(){
    this.MainService.notifySubscribers(this.event).subscribe((response)=>{
      console.log(response);
      if (response.success){
        this.SharedService.showSnackbar('Notifications sent',null,5000)
      }
    },(error)=>{
      console.log(error)
      this.SharedService.showSnackbar('There was an error',null,5000)
    });
  }
}
