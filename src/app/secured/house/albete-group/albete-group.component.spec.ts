import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AlbeteGroupComponent} from './albete-group.component';

describe('AlbeteGroupComponent', () => {
  let component: AlbeteGroupComponent;
  let fixture: ComponentFixture<AlbeteGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbeteGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbeteGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
