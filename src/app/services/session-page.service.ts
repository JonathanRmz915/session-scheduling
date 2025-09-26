import { Injectable, signal } from '@angular/core';
import { SessionPage } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SessionPageService {
  sessionPage = signal<SessionPage | null>(null);

  confirmed = signal(false);

  get hostName() {
    return `${this.sessionPage()?.host.firstName} ${this.sessionPage()?.host.lastName}`;
  }

  get hostRole() {
    return this.sessionPage()?.host.profession ?? '';
  }

  get hostPhoto() {
    return this.sessionPage()?.host.photo;
  }

  get userFullName() {
    return `${this.sessionPage()?.user.firstName} ${this.sessionPage()?.user.lastName}`;
  }

  get userEmail() {
    return this.sessionPage()?.user.email ?? '';
  }

  get userTimeZone() {
    return this.sessionPage()?.user.timeZone ?? '';
  }
}
