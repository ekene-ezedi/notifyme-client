import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-verifyaccount',
  templateUrl: './verifyaccount.component.html',
  styleUrls: ['./verifyaccount.component.css']
})
export class VerifyaccountComponent implements OnInit {

  constructor(private AuthService:AuthService,private route:ActivatedRoute,private router:Router,private sharedService:SharedService) { }

  ngOnInit(): void {
    let token = this.route.snapshot.paramMap.get('token');
    let responseBody;
    this.AuthService.VerifyAccount(token).subscribe((response)=>{
      responseBody = {...response};
      if (responseBody.success) {
        this.router.navigate(['/channelcat']);
      }
    },
    (error)=>{
      this.sharedService.showSnackbar('oops!!, Something went wrong', null, 10000);
    });
  }

}
