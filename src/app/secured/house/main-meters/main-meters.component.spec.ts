import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainMetersComponent} from './main-meters.component';

describe('MainMetersComponent', () => {
  let component: MainMetersComponent;
  let fixture: ComponentFixture<MainMetersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMetersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMetersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
