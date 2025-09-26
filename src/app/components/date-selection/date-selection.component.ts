import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideFlatpickrDefaults } from 'angularx-flatpickr';
import { TzDisplayPipe } from '@app/pipes';
import { CalendarComponent } from '@app/components';

@Component({
  selector: 'app-date-selection',
  imports: [FormsModule, CalendarComponent, TzDisplayPipe, NgIf],
  templateUrl: './date-selection.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  providers: [provideFlatpickrDefaults()],
})
export class DateSelectionComponent implements OnDestroy{
  @Input() date?: Date;
  @Input() enabledDates: string[] = [];
  @Input() timezone = '';

  @Output() selectedDate = new EventEmitter<Date>();

  now = signal(new Date());
  private t = setInterval(() => this.now.set(new Date()), 60_000);
  ngOnDestroy() { clearInterval(this.t); }
}
