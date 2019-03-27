import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionResultComponentComponent } from './election-result-component.component';

describe('ElectionResultComponentComponent', () => {
  let component: ElectionResultComponentComponent;
  let fixture: ComponentFixture<ElectionResultComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectionResultComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectionResultComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
