import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrickFinderComponent } from './trick-finder.component';

describe('TrickFinderComponent', () => {
  let component: TrickFinderComponent;
  let fixture: ComponentFixture<TrickFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrickFinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrickFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
