import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetlink:boolean;
  resetPassword:boolean;
  match:boolean = true;
  responseBody;
  errorMsg;
  token:string;
  constructor(private AuthService:AuthService,private SharedService:SharedService, private router:Router, private route:ActivatedRoute ) { }

  ngOnInit(): void {
    let resetMode = this.route.snapshot.queryParams;
    this.token = this.route.snapshot.params.token;
    if (resetMode.reset == undefined){
      this.resetlink = true;
      this.resetPassword = false;
      // console.log('UNDEFINED'+resetMode.reset);
    }else{
    // console.log(resetMode)
    this.resetlink = false;
    this.resetPassword = true;
  }
  }

  onSendResetLink(resetLinkForm:NgForm){
    this.AuthService.passwordResetLink(resetLinkForm.value).subscribe((response)=>{
      this.responseBody = {...response};
      if (this.responseBody.success) {
        this.SharedService.showSnackbar(this.responseBody.msg,null,10000);
      }
    },(error)=>{
      console.log(error)
      this.errorMsg = {...error};
      this.SharedService.showSnackbar(this.errorMsg.error.error,null,10000);
    });
  }

  onResetPassword(resetPasswordForm:NgForm){
    let password = resetPasswordForm.value.password;
    let cpassword = resetPasswordForm.value.cpassword;
    if (password != cpassword) {
      this.match = false;
    }else{
      let data = {
        "password":password,
        "token":this.token
      }
      this.AuthService.passwordReset(data).subscribe((response)=>{
        this.responseBody = {...response};
        if (this.responseBody.success) {
          this.router.navigate(['home'])
        }
      },(error)=>{

      })
      // console.log(data)
      this.match = true;
    }
  }

}
