import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RampBuilderComponent } from './ramp-builder.component';

describe('RampBuilderComponent', () => {
  let component: RampBuilderComponent;
  let fixture: ComponentFixture<RampBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RampBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RampBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
