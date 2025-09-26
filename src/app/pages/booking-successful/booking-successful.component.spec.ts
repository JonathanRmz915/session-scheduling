import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingSuccessfulComponent } from './booking-successful.component';
import { SessionPageService } from '@app/services';

describe('BookingSuccessfulComponent', () => {
  let fixture: ComponentFixture<BookingSuccessfulComponent>;
  let component: BookingSuccessfulComponent;
  let sessionPageServiceMock: any;

  beforeEach(async () => {
    sessionPageServiceMock = {
      hostName: 'John Doe',
      hostRole: 'Therapist',
      hostPhoto: null
    };

    await TestBed.configureTestingModule({
      imports: [BookingSuccessfulComponent],
      providers: [{ provide: SessionPageService, useValue: sessionPageServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('name getter returns hostName from service', () => {
    expect(component.name).toBe('John Doe');
  });

  it('role getter returns hostRole from service', () => {
    expect(component.role).toBe('Therapist');
  });

  it('photoUrl returns hostPhoto when provided', () => {
    sessionPageServiceMock.hostPhoto = 'https://example.com/avatar.jpg';
    fixture.detectChanges();
    expect(component.photoUrl).toBe('https://example.com/avatar.jpg');
  });

  it('photoUrl falls back to gravatar when hostPhoto is falsy', () => {
    sessionPageServiceMock.hostPhoto = null;
    fixture.detectChanges();
    expect(component.photoUrl).toBe('https://www.gravatar.com/avatar/?d=mp');
  });

  it('onJoinVibly opens vibly in same tab', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null as any);
    component.onJoinVibly();
    expect(openSpy).toHaveBeenCalledWith('https://vibly.io', '_self');
    openSpy.mockRestore();
  });
});
