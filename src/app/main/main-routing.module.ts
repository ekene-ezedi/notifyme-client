import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChannelcatComponent } from './channel-comp/channelcat/channelcat.component';
import { ChannellistComponent } from './channel-comp/channellist/channellist.component';
import { ChannelComponent } from './channel-comp/channel/channel.component';
import { CreateComponent } from './channel-comp/create/create.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../auth/auth.guard';
import { MyChannelsComponent } from './channel-comp/my-channels/my-channels.component';
import { CreateEventComponent } from './event-comp/create-event/create-event.component';
import { EventComponent } from './event-comp/event/event.component';
import { MySubscriptionsComponent } from './channel-comp/my-subscriptions/my-subscriptions.component';
import { EventFeedComponent } from './event-comp/event-feed/event-feed.component';
import { UpdateEventComponent } from './event-comp/update-event/update-event.component';
import { ExploreComponent } from './channel-comp/explore/explore.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'channelcat', component:ChannelcatComponent, canActivate:[AuthGuard]},
  {path:'channellist', component:ChannellistComponent, canActivate:[AuthGuard]},
  {path:'channel/create', component:CreateComponent, canActivate:[AuthGuard]},
  {path:'channel/:id', component:ChannelComponent, canActivate:[AuthGuard]},
  {path:'home', component:HomeComponent,canActivate:[AuthGuard], children:[
    {path:'', component:EventFeedComponent},
    {path:'my-channels', component:MyChannelsComponent},
    {path:'my-subscriptions', component:MySubscriptionsComponent},
    {path:'explore', component:ExploreComponent},
    {path:'notifications', component:NotificationsComponent},
    {path:'profile', component:ProfileComponent}
  ]},
  {path:'event/create/:id', component:CreateEventComponent},
  {path:'event/:id', component:EventComponent},
  {path:'event/update/:id', component:UpdateEventComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
