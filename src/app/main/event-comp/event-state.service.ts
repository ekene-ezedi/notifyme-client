import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventStateService {

  public event = new Subject<any>();
  public events = new Subject<any>();
  constructor() { }
}
