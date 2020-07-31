import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventStateService {

  public event = new Subject<any>();
  public events = new BehaviorSubject<any>([]);
  constructor() { }
}
