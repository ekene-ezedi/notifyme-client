import { Component, OnInit } from '@angular/core';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { AuthRoutingModule } from '../auth-routing.module';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  faFacebookF = faFacebookF;
  faGoogle = faGoogle
  responseBody;
  errorMsg;
  isVerified:boolean = true;

  constructor(private AuthService:AuthService,private router:Router,private SharedService:SharedService) { }

  ngOnInit(): void {
    this.SharedService.isAuth.subscribe((response)=>{
      if (response){
        this.router.navigate(['/home']);
      }
    });
  }

  onSubmit(form:NgForm){

    // console.log(form.value)
    this.AuthService.signin(form.value).subscribe((response)=>{   
      if (response.success) {
      let token = response.token
      localStorage.setItem('x-auth-token',token);
        this.SharedService.isAuth.next(this.AuthService.isAuth());
        this.router.navigate(['/home']);
      }
    }, (error)=>{
      this.errorMsg = {...error};
      if (this.errorMsg.error.verificationDetails) {
        this.isVerified = false;
      }
      this.SharedService.showSnackbar(this.errorMsg.error.error,null,10000);
    });
  }

  onSendVerificationEmail(){
    let body = {...this.errorMsg.error.verificationDetails}
    console.log(body)
    this.AuthService.resendVerificationEmail(body).subscribe((response)=>{
    this.responseBody = {...response};
      this.SharedService.showSnackbar(this.responseBody.msg,null,10000);
    }, (error)=>{
      this.errorMsg = {...error};
      this.SharedService.showSnackbar(this.errorMsg.error.error,null,10000);
    });
  }

}
