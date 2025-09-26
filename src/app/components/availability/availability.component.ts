import { DatePipe, NgForOf } from '@angular/common';
import { Component, computed, EventEmitter, inject, input, Output } from '@angular/core';
import { TimeRange } from '@app/models';
import { AvailabilityService } from '@app/services';
import { timeStringToNumber } from '@app/utils';

type Time = { value: string, label: string, disabled: boolean };

@Component({
  selector: 'app-availability',
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './availability.component.html',
  standalone: true,
})
export class AvailabilityComponent {
  @Output() selectedTime = new EventEmitter<string>();

  selectedDate = input<Date>()
  slots = input<TimeRange[]>();

  private availabilityService = inject(AvailabilityService);
  private readonly numberOfWorkingHours = 12;
  private readonly startWorkingAt = 8;
  private workingHours = Array.from({ length: this.numberOfWorkingHours })
    .map((_, i) => {
      const hour = String(i + this.startWorkingAt).padStart(2, '0');
      const value = `${ hour }:00`;
      return ({ value, label: `${value}am`, disabled: true }) as Time;
    });

  availability = computed(() => {
    const initial = [] as Time[];
    const slots = this.slots();

    if (!slots) return initial;

    return slots.reduce((acc, slot) => {
      const start = timeStringToNumber(slot.start);
      const startIdx = start - this.startWorkingAt;
      const endIdx = startIdx + (timeStringToNumber(slot.end) - start) + 1;

      return [
        ...acc.slice(0, startIdx),
        ...acc.slice(startIdx, endIdx).map(h => ({ ...h, disabled: false })),
        ...acc.slice(endIdx),
      ];
    }, this.workingHours);
  });

  clearDate(){
    this.availabilityService.selectedDate.set(undefined);
  }
}
