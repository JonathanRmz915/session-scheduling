import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SessionPageService } from '@app/services';

@Component({
  selector: 'app-booking-successful',
  imports: [CommonModule],
  templateUrl: './booking-successful.component.html',
})
export class BookingSuccessfulComponent {
  readonly title = 'Booking Successful';
  readonly subtitle = 'Take your growth to the next level';

  private sessionPageService = inject(SessionPageService);

  get name() {
    return this.sessionPageService.hostName;
  }

  get role() {
    return this.sessionPageService.hostRole;
  }

  get photoUrl() {
    return this.sessionPageService.hostPhoto ?? 'https://www.gravatar.com/avatar/?d=mp'
  }

  onJoinVibly(){
    window.open('https://vibly.io', '_self');
  }
}
