import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';
import { MainService } from '../../main.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-channelcat',
  templateUrl: './channelcat.component.html',
  styleUrls: ['./channelcat.component.css']
})
export class ChannelcatComponent implements OnInit {
  userSelectedCat:object[]=[];
  categories;
  constructor(private sharedService:SharedService,private router:Router, private MainService:MainService, private AuthService:AuthService ) { }

  ngOnInit(): void {
    this.sharedService.isAuth.next(this.AuthService.isAuth());
    this.MainService.getCategories().subscribe((response)=>{
      this.categories = response;
    });    
  }

   onSelectCatToggle(category){
    if (!category.isSelected) {
      const checkCat = obj => obj.name === category.name;
      let categoryExist = this.userSelectedCat.some(checkCat);
        if (!categoryExist) {
          this.userSelectedCat.splice(0,0,category.name);
        };
        category.isSelected = true;     
    }else{
      let index = this.userSelectedCat.indexOf(category);
      this.userSelectedCat.splice(index,1);
      category.isSelected = false; 
    }
   }

   loadChannels(){
      this.router.navigate(['channellist'],{queryParams:{cat:this.userSelectedCat}});
   }

}
