import { Injectable, signal } from '@angular/core';
import { DateAvailability } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  availabilities = signal<DateAvailability[]>([]);
  availableDates = signal<string[]>([]);
  selectedDate = signal<Date | undefined>(undefined);
  selectedTime = signal<string | undefined>(undefined);
}
