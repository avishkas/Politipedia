import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorResultComponent } from './donor-result.component';

describe('DonorResultComponent', () => {
  let component: DonorResultComponent;
  let fixture: ComponentFixture<DonorResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
