import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionInfoComponent } from './session-info.component';

describe('SessionInfoComponent', () => {
  let fixture: ComponentFixture<SessionInfoComponent>;
  let component: SessionInfoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionInfoComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SessionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('returns default gravatar when sessionPage is null or host.photo is falsy', () => {
    component.sessionPage = null;
    fixture.detectChanges();
    expect(component.photo).toBe('https://www.gravatar.com/avatar/?d=mp');
  });

  it('returns host photo when provided', () => {
    const mock = {
      host: { photo: 'https://example.com/avatar.jpg', firstName: 'Ana', lastName: 'Gomez', profession: 'Coach' },
      service: { title: 'Therapy' },
      duration: 30
    } as any;

    component.sessionPage = mock;
    fixture.detectChanges();

    expect(component.photo).toBe('https://example.com/avatar.jpg');
    expect(component.hostName).toBe('Ana Gomez');
    expect(component.profession).toBe('Coach');
    expect(component.serviceTitle).toBe('Therapy');
    expect(component.duration).toBe(30);
  });

  it('hostName is empty string when sessionPage is null', () => {
    component.sessionPage = null;
    fixture.detectChanges();
    expect(component.hostName).toBe('');
  });

  it('duration falls back to "-" when undefined', () => {
    const mock = {
      host: { firstName: 'Luis', lastName: 'Perez', photo: null },
      service: { title: 'Consult' },
    } as any;

    component.sessionPage = mock;
    fixture.detectChanges();
    expect(component.duration).toBe('-');
  });
});
