import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { MainRoutingModule } from './main-routing.module';
import { ChannelcatComponent } from '././channel-comp/channelcat/channelcat.component';
import { ChannellistComponent } from '././channel-comp/channellist/channellist.component';
import { ChannelComponent } from '././channel-comp/channel/channel.component';
import { CreateComponent } from './channel-comp/create/create.component';
import { HomeComponent } from './home/home.component';
import { MyChannelsComponent } from './channel-comp/my-channels/my-channels.component';
import { MySubscriptionsComponent } from './channel-comp/my-subscriptions/my-subscriptions.component';

import { CreateEventComponent } from './event-comp/create-event/create-event.component';
import { EventlistComponent } from './event-comp/eventlist/eventlist.component';
import { UpcomingEventlistComponent } from './event-comp/upcoming-eventlist/upcoming-eventlist.component';
import { EventComponent } from './event-comp/event/event.component';
import { EventFeedComponent } from './event-comp/event-feed/event-feed.component';
import { UpdateEventComponent } from './event-comp/update-event/update-event.component';
import { ExploreComponent } from './channel-comp/explore/explore.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';




@NgModule({
  declarations: [ChannelcatComponent, ChannellistComponent, ChannelComponent, CreateComponent, HomeComponent, MyChannelsComponent,MySubscriptionsComponent, CreateEventComponent, EventlistComponent, UpcomingEventlistComponent, EventComponent, EventFeedComponent, UpdateEventComponent, ExploreComponent, NotificationsComponent, ProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
