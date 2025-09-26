import { TestBed } from '@angular/core/testing';
import { SessionPageService } from './session-page.service';
import { SessionPage } from '../models';

describe('SessionPageService', () => {
  let service: SessionPageService;

  const mockSessionPage: SessionPage = {
    id: 'sess-1',
    host: {
      firstName: 'Ana',
      lastName: 'Smith',
      photo: 'https://example.com/a.png',
      profession: 'Coach'
    },
    user: {
      firstName: 'Bob',
      lastName: 'Jones',
      email: 'bob@example.com',
      timeZone: 'America/New_York'
    },
    service: { title: 'Consultation' } as any,
    duration: '30' as any
  } as unknown as SessionPage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('confirmed signal defaults to false and is writable', () => {
    expect(service.confirmed()).toBe(false);
    service.confirmed.set(true);
    expect(service.confirmed()).toBe(true);
  });

  it('getters reflect the sessionPage signal', () => {
    service.sessionPage.set(mockSessionPage);

    expect(service.hostName).toBe('Ana Smith');
    expect(service.hostRole).toBe('Coach');
    expect(service.hostPhoto).toBe('https://example.com/a.png');

    expect(service.userFullName).toBe('Bob Jones');
    expect(service.userEmail).toBe('bob@example.com');
    expect(service.userTimeZone).toBe('America/New_York');
  });
});
