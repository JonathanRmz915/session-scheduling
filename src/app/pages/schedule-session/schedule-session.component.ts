import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AvailabilityService, SessionPageService, SessionsService } from '@app/services';
import { HeaderComponent } from '@app/components';

@Component({
  selector: 'app-schedule-session',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './schedule-session.component.html',
})
export class ScheduleSessionComponent implements OnInit {

  private svc = inject(SessionsService);
  private sessionPageService = inject(SessionPageService);
  private availabilityService = inject(AvailabilityService);

  get confirmed() {
    return this.sessionPageService.confirmed();
  }

  ngOnInit() {
    const sessionId = crypto.randomUUID();
    this.svc.getSessionPage(sessionId)
      .subscribe(p => this.sessionPageService.sessionPage.set(p));

    this.svc.getAvailableDateTimes(sessionId)
      .subscribe(availabilities => {
        this.availabilityService.availableDates.set(availabilities.map(a => a.date));
        this.availabilityService.availabilities.set(availabilities);
      });
  }
}
