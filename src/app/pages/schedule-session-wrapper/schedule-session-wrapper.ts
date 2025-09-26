import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvailabilityService, SessionPageService } from '@app/services';
import { SessionInfoComponent } from '@app/components';

@Component({
  selector: 'app-schedule-session-wrapper',
  imports: [
    RouterOutlet,
    SessionInfoComponent
  ],
  templateUrl: './schedule-session-wrapper.html',
})
export class ScheduleSessionWrapper {
  private sessionPageService = inject(SessionPageService);
  private availabilityService = inject(AvailabilityService);

  get sessionPage() {
    return this.sessionPageService.sessionPage();
  }

  get selectedDate() {
    return this.availabilityService.selectedDate();
  }
}
