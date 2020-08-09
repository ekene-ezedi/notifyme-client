import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { Page404Component } from './page404/page404.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './shared/loader/loader.service';
import { LoaderInterceptor } from './shared/loader.interceptor';
import { MainModule } from './main/main.module';
import { ToolbarComponent } from './navigation/toolbar/toolbar.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { DeleteChannelComponent } from './main/channel-comp/channel/delete-channel.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SplashscreenComponent,
    Page404Component,
    LoaderComponent,
    ToolbarComponent,
    SidenavComponent,
    DeleteChannelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AuthModule,
    MainModule,
    SharedModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    
  ],
  providers: [LoaderService,{provide:HTTP_INTERCEPTORS, useClass:LoaderInterceptor,multi:true}],
  bootstrap: [AppComponent],
  entryComponents:[DeleteChannelComponent]
})
export class AppModule { }
