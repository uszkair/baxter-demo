import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ObjectiveToolComponent} from './objective-tool.component';

describe('ObjectiveToolComponent', () => {
  let component: ObjectiveToolComponent;
  let fixture: ComponentFixture<ObjectiveToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectiveToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectiveToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
