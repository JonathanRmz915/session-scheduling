import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { AvailabilityWrapperComponent } from './availability-wrapper.component';

jest.mock('@app/components', () => {
  class MockDateSelectionComponent {}
  return { DateSelectionComponent: MockDateSelectionComponent };
});

xdescribe('AvailabilityWrapper', () => {
  let component: AvailabilityWrapperComponent;
  let fixture: ComponentFixture<AvailabilityWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilityWrapperComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailabilityWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
