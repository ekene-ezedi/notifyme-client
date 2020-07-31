import { Component, OnInit } from '@angular/core';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  faFacebookF = faFacebookF;
  faGoogle = faGoogle;
  errorMsg:String;
  isRegistered:Boolean = false;
  response;
  // private data:{firstname:String,lastname:String};
  constructor(private Auth:AuthService, private SharedService:SharedService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.Auth.signup(form.value).subscribe((data)=>{
      this.response = {...data};
      if (this.response.success) {
        this.isRegistered = true;
      }
    },
    (error)=>{
      this.errorMsg = error.error.msg;
      this.SharedService.showSnackbar(this.errorMsg,null,10000);
    });
  }

}
