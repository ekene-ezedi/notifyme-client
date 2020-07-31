import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../app-config';

const token = localStorage.getItem('x-auth-token')
//httpoptions
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'x-auth-token': token
  }),withCredentials: true
  // observe: 'response' as 'response'
}

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private apiEndpoint = new AppConfig().apiEndpoint;
  private channelUrl = `${this.apiEndpoint}api/channel`;
  private eventUrl = `${this.apiEndpoint}api/event`;
  private userUrl = `${this.apiEndpoint}api/users`;
  constructor(private http:HttpClient) { }

  //get user
  getUser():Observable<any>{
    return this.http.get(this.userUrl,httpOptions);
  }

  //get channels by categories
  getchanbycat(cat):Observable<any>{
    return this.http.get(`${this.channelUrl}/getchanbycat`,{withCredentials:true,params:{
      cat
    }});
  }

  //get channel categories
  getCategories(){
    return this.http.get(`${this.channelUrl}/categories`,httpOptions);
  }

  //get single channel
  getChannel(id):Observable<any>{
    return this.http.get(`${this.channelUrl}/${id}`, httpOptions);
  }

  //get my channels
  getMyChannels():Observable<any>{
    return this.http.get(`${this.channelUrl}/my-channels`, httpOptions);
  }

  //get all channels
  getChannels():Observable<any>{
    return this.http.get(`${this.channelUrl}`,httpOptions);
  }

  //create channel
  createChannel(channel):Observable<any>{
    return this.http.post(`${this.channelUrl}`,channel,httpOptions);
  }

  //update
  updateChannel(channel):Observable<any>{
    return this.http.put(`${this.channelUrl}/${channel._id}`,channel,httpOptions);
  }

  //delete
  deleteChannel(id):Observable<any>{
    return this.http.delete(`${this.channelUrl}/${id}`,httpOptions);
  }

  //subscribe
  subscribe(id):Observable<any>{
    return this.http.put(`${this.channelUrl}/subscribe/${id}`,null,httpOptions);
  }

  //subscribe
  unSubscribe(id):Observable<any>{
    return this.http.put(`${this.channelUrl}/unsubscribe/${id}`,null,httpOptions);
  }

  //upload channel background
  uploadChannelbg(img,id):Observable<any>{
    return this.http.put(`${this.channelUrl}/upload/${id}`,img,{headers:{
      'x-auth-token':token
    },withCredentials:true})
  }

  //upload event background
  uploadEventbg(img,id):Observable<any>{
    return this.http.put(`${this.eventUrl}/upload/${id}`,img,{headers:{
      'x-auth-token':token
    },withCredentials:true});
  }

  //upload user profile pic
  uploadAvatar(img,id):Observable<any>{
    return this.http.put(`${this.userUrl}/upload/${id}`,img,{headers:{
      'x-auth-token':token
    },withCredentials:true})
  }

  //update profile
  updateProfile(user):Observable<any>{
    return this.http.put(this.userUrl,user,httpOptions);
  }
  //get user subscription
  getSubscriptions():Observable<any>{
    return this.http.get(`${this.channelUrl}/subscriptions`,httpOptions);
  }
  //create event
  createEvent(id,event):Observable<any>{
    return this.http.post(`${this.eventUrl}/${id}`,event,httpOptions);
  }

  //get all event
  getEvents(id,status):Observable<any>{
    return this.http.get(`${this.eventUrl}/${id}/${status}`,httpOptions);
  }

  //get specific channel
  getEvent(id):Observable<any>{
    return this.http.get(`${this.eventUrl}/${id}`,httpOptions);
  }

  //update event
  updateEvent(id,event):Observable<any>{
    return this.http.put(`${this.eventUrl}/${id}`,event,httpOptions);
  }

  //add guest
  addGuest(id,guests):Observable<any>{
    return this.http.put(`${this.eventUrl}/guest/${id}`,guests,httpOptions);
  }

  //update guest
  updateGuests(id,guests):Observable<any>{
    return this.http.put(`${this.eventUrl}/guests/${id}`,guests,httpOptions);
  }

  //delete event
  deleteEvent(id):Observable<any>{
    return this.http.delete(`${this.eventUrl}/${id}`,httpOptions);
  }

  //delete guest
  deleteGuest(id,gid):Observable<any>{
    return this.http.delete(`${this.eventUrl}/guest/${id}/${gid}`,httpOptions);
  }

  //attend Event
  attendEvent(id):Observable<any>{
    return this.http.put(`${this.eventUrl}/attend/${id}`,null,httpOptions);
  }

  //get events by subscription
  getEventsBySubscription():Observable<any>{
    return this.http.get(this.eventUrl,httpOptions);
  }

  //like event
  like(id):Observable<any>{
    return this.http.put(`${this.eventUrl}/like/${id}`,null,httpOptions);
  }

  //search channel
  search(searchstr):Observable<any>{
    return this.http.get(`${this.channelUrl}/search/${searchstr}`,httpOptions);
  }

  //get events user is attending
  getEventsAttending():Observable<any>{
    return this.http.get(`${this.eventUrl}/attending`,httpOptions);
  }

  //notify subscribers
  notifySubscribers(event):Observable<any>{
    return this.http.post(`${this.eventUrl}/notify_subscribers`,event,httpOptions);
  }
}