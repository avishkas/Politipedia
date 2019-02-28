import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributonsComponent } from './contributons.component';

describe('ContributonsComponent', () => {
  let component: ContributonsComponent;
  let fixture: ComponentFixture<ContributonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
