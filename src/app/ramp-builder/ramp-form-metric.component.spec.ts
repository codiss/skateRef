import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RampFormMetricComponent } from './ramp-form-metric.component';

describe('RampFormMetricComponent', () => {
  let component: RampFormMetricComponent;
  let fixture: ComponentFixture<RampFormMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RampFormMetricComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RampFormMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
