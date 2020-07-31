import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelcatComponent } from './channelcat.component';

describe('ChannelcatComponent', () => {
  let component: ChannelcatComponent;
  let fixture: ComponentFixture<ChannelcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
