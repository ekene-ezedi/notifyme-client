import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { SharedService } from 'src/app/shared/shared.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;selectedFile;pswFormToggle:boolean = false;editMode:boolean = false;
  constructor(private MainService:MainService, private SharedService:SharedService) { }

  ngOnInit(): void {
    this.MainService.getUser().subscribe((response)=>{
      this.user = response.user;
    },(error)=>console.log(error));
  }

  onUpload(event){
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.type == 'image/jpeg' || this.selectedFile.type == 'image/png') {
      const imgUpload = new FormData();
      imgUpload.append('avatar',this.selectedFile,this.selectedFile.name);
      this.MainService.uploadAvatar(imgUpload,this.user._id).subscribe((response)=>{
        this.user.imgurl = response.user.imgurl;
      },(error)=>console.log(error));
    }else{
       this.SharedService.showSnackbar('File must be an JPEG or PNG',null,5000);
    }
  }

  onSave(form:NgForm){
    if (form.value.firstname == ""){
      form.value.firstname = this.user.firstname;
    }

    if (form.value.lastname == "") {
      form.value.lastname = this.user.lastname; 
    }

    if (form.value.email == "") {
      form.value.email = this.user.email
    }

    if (form.value.occupation == "") {
      form.value.occupation = this.user.occupation
    }

    this.user.firstname = form.value.firstname;
    this.user.lastname = form.value.lastname;
    this.user.email = form.value.email;
    this.user.occupation = form.value.occupation; 
    this.user.password = form.value.password;

    if (form.value.password !== form.value.password2) {
      this.SharedService.showSnackbar('Passwords mismatch',null,5000);
    }else{
      this.MainService.updateProfile(this.user).subscribe((response)=>{
        this.user = response.user;
        this.editMode = false;
      }, (error)=>console.log(error))
    }
  }
}
