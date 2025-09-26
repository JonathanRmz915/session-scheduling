import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailabilityComponent } from './availability.component';
import { AvailabilityService } from '@app/services';

describe('AvailabilityComponent', () => {
  let fixture: ComponentFixture<AvailabilityComponent>;
  let component: AvailabilityComponent;
  let availabilityServiceMock: any;

  beforeEach(async () => {
    availabilityServiceMock = {
      selectedDate: { set: jest.fn() }
    };

    await TestBed.configureTestingModule({
      imports: [AvailabilityComponent],
      providers: [
        { provide: AvailabilityService, useValue: availabilityServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('computes availability from slots (whole hours)', async () => {
    const slots = [
      { start: '09:00', end: '11:00' } as any
    ];

    fixture.componentRef.setInput('slots', slots); // 👈 así se setea un input()
    fixture.detectChanges();

    const availability = component.availability();
    const enabled = availability.filter(t => !t.disabled).map(t => t.value);

    expect(enabled).toEqual(['09:00', '10:00', '11:00']);
  });

  it('clearDate calls', () => {
    component.clearDate();
    expect(availabilityServiceMock.selectedDate.set).toHaveBeenCalledWith(undefined);
  });
});
