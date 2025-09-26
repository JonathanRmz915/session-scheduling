import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TzDisplayPipe } from '@app/pipes';
import { AvailabilityService, SessionPageService } from '@app/services';
import { formatYYYYMMDD } from '@app/utils';

@Component({
  selector: 'app-confirm-booking',
  standalone: true,
  imports: [CommonModule, TzDisplayPipe],
  templateUrl: './confirm-booking.component.html',
})
export class ConfirmBookingComponent {
  private availabilityService = inject(AvailabilityService);
  private sessionPageService = inject(SessionPageService);
  private route  = inject(ActivatedRoute);
  private router = inject(Router);

  selectedTime = computed(() => {
    const selectedDate = this.availabilityService.selectedDate();
    const selectedTime = this.availabilityService.selectedTime();
    if (!selectedDate || !selectedTime) return null;
    return new Date(`${formatYYYYMMDD(selectedDate)}T${selectedTime}:00`);
  });

  get attendeeName() {
    return this.sessionPageService.userFullName;
  }

  get attendeeEmail() {
    return this.sessionPageService.userEmail;
  };

  get timezone() {
    return this.sessionPageService.userTimeZone;
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onConfirm() {
    this.sessionPageService.confirmed.set(true);
    this.router.navigate(['../../booking-successful'], { relativeTo: this.route });
  }
}
