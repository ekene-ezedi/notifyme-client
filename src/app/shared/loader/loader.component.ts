import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  constructor(public LoaderService:LoaderService) { }
  isLoading:Subject<boolean> = this.LoaderService.isLoading;
  ngOnInit(): void {
  }

}
