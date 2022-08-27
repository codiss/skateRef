import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RampFormEnglishComponent } from './ramp-form-english.component';

describe('RampFormEnglishComponent', () => {
  let component: RampFormEnglishComponent;
  let fixture: ComponentFixture<RampFormEnglishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RampFormEnglishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RampFormEnglishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
