import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmBookingComponent } from './confirm-booking.component';
import { AvailabilityService, SessionPageService } from '@app/services';
import { Router, ActivatedRoute } from '@angular/router';

describe('ConfirmBookingComponent', () => {
  let fixture: ComponentFixture<ConfirmBookingComponent>;
  let component: ConfirmBookingComponent;

  let availabilityServiceMock: any;
  let sessionPageServiceMock: any;
  let routerMock: any;
  let routeMock: any;

  beforeEach(async () => {
    availabilityServiceMock = {
      selectedDate: jest.fn(() => null),
      selectedTime: jest.fn(() => null)
    };

    sessionPageServiceMock = {
      userFullName: 'Alice Example',
      userEmail: 'alice@example.com',
      userTimeZone: 'Europe/Madrid',
      confirmed: { set: jest.fn() }
    };

    routerMock = {
      navigate: jest.fn().mockResolvedValue(true)
    };

    routeMock = {};
    await TestBed.configureTestingModule({
      imports: [ConfirmBookingComponent],
      providers: [
        { provide: AvailabilityService, useValue: availabilityServiceMock },
        { provide: SessionPageService, useValue: sessionPageServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: routeMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selectedTime is null when no selectedDate and no selectedTime', () => {
    availabilityServiceMock.selectedDate = jest.fn(() => null);
    availabilityServiceMock.selectedTime = jest.fn(() => null);

    fixture = TestBed.createComponent(ConfirmBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.selectedTime()).toBeNull();
  });

  it('selectedTime is null when selectedDate exists but selectedTime is null', () => {
    availabilityServiceMock.selectedDate = jest.fn(() => new Date(2025, 0, 2));
    availabilityServiceMock.selectedTime = jest.fn(() => null);

    fixture = TestBed.createComponent(ConfirmBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.selectedTime()).toBeNull();
  });

  it('selectedTime returns a Date when both selectedDate and selectedTime are present', () => {
    const selDate = new Date(2025, 0, 2);
    const selTime = '09:30';

    availabilityServiceMock.selectedDate = jest.fn(() => selDate);
    availabilityServiceMock.selectedTime = jest.fn(() => selTime);

    fixture = TestBed.createComponent(ConfirmBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const result = component.selectedTime();
    expect(result).toBeInstanceOf(Date);
    expect(result!.getFullYear()).toBe(2025);
    expect(result!.getMonth()).toBe(0);
    expect(result!.getDate()).toBe(2);
    expect(result!.getHours()).toBe(9);
    expect(result!.getMinutes()).toBe(30);
  });

  it('getters return values from sessionPageService', () => {
    expect(component.attendeeName).toBe('Alice Example');
    expect(component.attendeeEmail).toBe('alice@example.com');
    expect(component.timezone).toBe('Europe/Madrid');
  });

  it('onBack navigates to root', () => {
    component.onBack();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('onConfirm sets confirmed and navigates to booking-successful relative route', () => {
    component.onConfirm();
    expect(sessionPageServiceMock.confirmed.set).toHaveBeenCalledWith(true);
    expect(routerMock.navigate).toHaveBeenCalledWith(['../../booking-successful'], { relativeTo: routeMock });
  });
});
