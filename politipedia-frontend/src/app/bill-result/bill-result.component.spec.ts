import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillResultComponent } from './bill-result.component';

describe('BillResultComponent', () => {
  let component: BillResultComponent;
  let fixture: ComponentFixture<BillResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
