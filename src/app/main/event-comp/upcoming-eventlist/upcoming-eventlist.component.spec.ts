import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingEventlistComponent } from './upcoming-eventlist.component';

describe('UpcomingEventlistComponent', () => {
  let component: UpcomingEventlistComponent;
  let fixture: ComponentFixture<UpcomingEventlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingEventlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingEventlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
