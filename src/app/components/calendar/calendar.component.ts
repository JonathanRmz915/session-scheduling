import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

type Cell = { date: Date | null; inMonth: boolean };

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnChanges {
  @Input() selected?: Date;
  @Input() startFrom: Date | null = null;
  @Input() enabledDates: Array<string | Date> = [];

  @Output() selectedChange = new EventEmitter<Date>();

  viewYear!: number;
  viewMonth!: number;
  cells: Cell[] = [];

  private enabledSet = new Set<string>();

  constructor() {
    const base = this.startFrom ?? new Date();
    this.viewYear = base.getFullYear();
    this.viewMonth = base.getMonth();
    this.rebuild();
    this.recomputeEnabled();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startFrom'] && this.startFrom) {
      this.viewYear = this.startFrom.getFullYear();
      this.viewMonth = this.startFrom.getMonth();
      this.rebuild();
    }

    if (changes['enabledDates']) {
      this.recomputeEnabled();
      if (this.selected && this.isDisabled(this.selected)) {
        this.selected = undefined;
      }
    }

    if (changes['selected'] && this.selected) {
      this.viewYear = this.selected.getFullYear();
      this.viewMonth = this.selected.getMonth();
      this.rebuild();
    }
  }

  isDisabled(d: Date): boolean {
    return !this.enabledSet.has(this.toKey(d));
  }

  isSelected(d: Date): boolean {
    if (!this.selected) return false;

    if (this.isDisabled(d)) return false;

    return d.getFullYear() === this.selected.getFullYear()
      && d.getMonth() === this.selected.getMonth()
      && d.getDate() === this.selected.getDate();
  }

  get monthLabel(): string {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })
      .format(new Date(this.viewYear, this.viewMonth, 1));
  }

  prevMonth() {
    const d = new Date(this.viewYear, this.viewMonth - 1, 1);
    this.viewYear = d.getFullYear();
    this.viewMonth = d.getMonth();
    this.rebuild();
  }

  nextMonth() {
    const d = new Date(this.viewYear, this.viewMonth + 1, 1);
    this.viewYear = d.getFullYear();
    this.viewMonth = d.getMonth();
    this.rebuild();
  }

  select(d: Date) {
    if (isNaN(d.getTime()) || this.isDisabled(d)) return;
    this.selected = d;
    this.selectedChange.emit(d);
  }

  private toKey(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private normalizeToKey(input: string | Date): string {
    if (input instanceof Date) return this.toKey(input);
    return input;
  }

  private recomputeEnabled() {
    this.enabledSet = new Set((this.enabledDates ?? []).map(k => this.normalizeToKey(k)));
  }

  private rebuild() {
    const first = new Date(this.viewYear, this.viewMonth, 1);
    const firstDow = first.getDay();
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();

    const cells: Cell[] = [];
    for (let i = 0; i < firstDow; i++) cells.push({ date: null, inMonth: false });
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ date: new Date(this.viewYear, this.viewMonth, d), inMonth: true });
    }
    while (cells.length % 7 !== 0) cells.push({ date: null, inMonth: false });
    if (cells.length <= 35) while (cells.length < 42) cells.push({ date: null, inMonth: false });
    this.cells = cells;
  }
}
