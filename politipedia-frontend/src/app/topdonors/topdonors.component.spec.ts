import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopdonorsComponent } from './topdonors.component';

describe('TopdonorsComponent', () => {
  let component: TopdonorsComponent;
  let fixture: ComponentFixture<TopdonorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopdonorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopdonorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
