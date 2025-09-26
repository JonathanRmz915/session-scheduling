import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailabilityService, SessionPageService } from '@app/services';
import { formatYYYYMMDD } from '@app/utils';
import { AvailabilityComponent, DateSelectionComponent } from '@app/components';

@Component({
  selector: 'app-availability-wrapper',
  imports: [
    DateSelectionComponent,
    AvailabilityComponent
  ],
  templateUrl: './availability-wrapper.component.html',
  standalone: true
})
export class AvailabilityWrapperComponent {
  private availabilityService = inject(AvailabilityService);
  private sessionPageService = inject(SessionPageService);
  private router = inject(Router);
  private route  = inject(ActivatedRoute);

  timeZone = computed(() => this.sessionPageService.sessionPage()?.user.timeZone ?? '');

  slots = computed(() => {
    const selectedDate = this.availabilityService.selectedDate();
    if (!selectedDate) return [];

    const date = formatYYYYMMDD(selectedDate);
    const found = this.availabilityService.availabilities().find(a => a.date === date);
    return found?.times ?? [];
  });

  get availableDates() {
    return this.availabilityService.availableDates();
  }

  get selectedDate() {
    return this.availabilityService.selectedDate();
  }

  onSelectDate(date: Date) {
    this.availabilityService.selectedDate.set(date);
  }

  onSelectTime(time: string) {
    this.availabilityService.selectedTime.set(time);
    this.router.navigate(['../confirm-booking'], { relativeTo: this.route });
  }
}
