import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleSessionWrapper } from './schedule-session-wrapper';
import { SessionPageService, AvailabilityService } from '@app/services';

describe('ScheduleSessionWrapper', () => {
  let fixture: ComponentFixture<ScheduleSessionWrapper>;
  let component: ScheduleSessionWrapper;

  const sessionPageMock = {
    id: 'sess-1',
    host: { firstName: 'Ana', lastName: 'Smith', photo: '' , profession: 'Coach' },
    service: { title: 'Consultation' },
    duration: '30'
  };
  const selectedDateMock = '2025-01-01';

  const sessionPageServiceMock = {
    sessionPage: () => sessionPageMock
  };

  const availabilityServiceMock = {
    selectedDate: () => selectedDateMock
  };

  let sessionPageSpy: jest.SpyInstance;
  let selectedDateSpy: jest.SpyInstance;

  beforeEach(async () => {
    sessionPageSpy = jest.spyOn(sessionPageServiceMock, 'sessionPage');
    selectedDateSpy = jest.spyOn(availabilityServiceMock, 'selectedDate');

    await TestBed.configureTestingModule({
      imports: [ScheduleSessionWrapper],
      providers: [
        { provide: SessionPageService, useValue: sessionPageServiceMock },
        { provide: AvailabilityService, useValue: availabilityServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleSessionWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('returns sessionPage from SessionPageService', () => {
    const result = component.sessionPage;
    expect(sessionPageSpy).toHaveBeenCalled();
    expect(result).toEqual(sessionPageMock);
  });

  it('returns selectedDate from AvailabilityService', () => {
    const result = component.selectedDate;
    expect(selectedDateSpy).toHaveBeenCalled();
    expect(result).toEqual(selectedDateMock);
  });
});
