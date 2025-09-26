jest.mock('crypto', () => ({
randomUUID: jest.fn(() => 'fixed-session-id')
}));

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ScheduleSessionComponent } from './schedule-session.component';
import { SessionsService, SessionPageService, AvailabilityService } from '@app/services';
import { signal } from '@angular/core';

class MockSessionPageService {
  confirmed = signal<boolean>(false);
  sessionPage = signal<any>(null);
}

describe('ScheduleSessionComponent', () => {
let fixture: ComponentFixture<ScheduleSessionComponent>;
let component: ScheduleSessionComponent;

let sessionsServiceMock: any;
let sessionPageServiceMock: any;
let availabilityServiceMock: any;

const sessionPageMock = { id: 'sess-1', host: { firstName: 'Ana' } };
const availabilitiesMock = [
  { date: '2025-01-01', times: ['09:00', '10:00'] },
  { date: '2025-01-02', times: [] }
];

let originalGlobalCrypto: any;

beforeEach(async () => {
  originalGlobalCrypto = (globalThis as any).crypto;
  (globalThis as any).crypto = require('crypto');

  sessionsServiceMock = {
    getSessionPage: jest.fn(() => of(sessionPageMock)),
    getAvailableDateTimes: jest.fn(() => of(availabilitiesMock))
  };


  availabilityServiceMock = {
    availableDates: { set: jest.fn() },
    availabilities: { set: jest.fn() }
  };

  await TestBed.configureTestingModule({
    imports: [ScheduleSessionComponent],
    providers: [
      { provide: SessionsService, useValue: sessionsServiceMock },
      { provide: SessionPageService, useClass: MockSessionPageService },
      { provide: AvailabilityService, useValue: availabilityServiceMock }
    ]
  }).compileComponents();

  fixture = TestBed.createComponent(ScheduleSessionComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

afterEach(() => {
  (globalThis as any).crypto = originalGlobalCrypto;
  jest.resetAllMocks();
});

it('should create', () => {
  expect(component).toBeTruthy();
});

it('calls SessionsService with generated id and updates sessionPage and availabilities', () => {
  expect(sessionsServiceMock.getSessionPage).toHaveBeenCalled();
  expect(sessionsServiceMock.getAvailableDateTimes).toHaveBeenCalled();
  expect(availabilityServiceMock.availableDates.set).toHaveBeenCalledWith(availabilitiesMock.map(a => a.date));
  expect(availabilityServiceMock.availabilities.set).toHaveBeenCalledWith(availabilitiesMock);
});
});
