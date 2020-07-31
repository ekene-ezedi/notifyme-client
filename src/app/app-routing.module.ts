import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {path:'', component:SplashscreenComponent, pathMatch:'full'},
  {path:'**', component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
