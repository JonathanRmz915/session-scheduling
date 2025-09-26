import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let fixture: ComponentFixture<CalendarComponent>;
  let component: CalendarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('applies startFrom to viewYear/viewMonth on change', () => {
    const start = new Date(2021, 3, 10);
    component.startFrom = start;
    component.ngOnChanges({
      startFrom: new SimpleChange(undefined, start, true)
    });
    expect(component.viewYear).toBe(2021);
    expect(component.viewMonth).toBe(3);
  });

  it('recomputes enabledDates and isDisabled works for strings and Date', () => {
    const enabledDateStr = '2021-04-15';
    const enabledDateObj = new Date(2021, 3, 15);
    component.enabledDates = [enabledDateStr, enabledDateObj];
    component.ngOnChanges({
      enabledDates: new SimpleChange(undefined, component.enabledDates, true)
    });

    const target = new Date(2021, 3, 15);
    const other = new Date(2021, 3, 16);
    expect(component.isDisabled(target)).toBe(false);
    expect(component.isDisabled(other)).toBe(true);
  });

  it('select emits selectedChange and updates selected when date enabled', () => {
    const d = new Date(2021, 3, 20);
    component.enabledDates = [d];
    component.ngOnChanges({
      enabledDates: new SimpleChange(undefined, component.enabledDates, true)
    });

    const emitSpy = jest.spyOn(component.selectedChange, 'emit');
    component.select(d);

    expect(component.selected).toEqual(d);
    expect(emitSpy).toHaveBeenCalledWith(d);
  });

  it('select does nothing for disabled date', () => {
    const d = new Date(2021, 3, 21);
    component.enabledDates = [];
    component.ngOnChanges({
      enabledDates: new SimpleChange(undefined, component.enabledDates, true)
    });

    const emitSpy = jest.spyOn(component.selectedChange, 'emit');
    component.select(d);

    expect(component.selected).toBeUndefined();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('prevMonth and nextMonth update view and rebuild cells to 42 length', () => {
    const initialYear = component.viewYear;
    const initialMonth = component.viewMonth;

    component.prevMonth();
    const prevDate = new Date(initialYear, initialMonth - 1, 1);
    expect(component.viewYear).toBe(prevDate.getFullYear());
    expect(component.viewMonth).toBe(prevDate.getMonth());
    expect(component.cells.length).toBe(42);

    component.nextMonth();
    const backDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
    expect(component.viewYear).toBe(backDate.getFullYear());
    expect(component.viewMonth).toBe(backDate.getMonth());
    expect(component.cells.length).toBe(42);
  });

  it('isSelected returns true only for the same enabled date', () => {
    const d = new Date(2022, 0, 5);
    component.enabledDates = [d];
    component.ngOnChanges({
      enabledDates: new SimpleChange(undefined, component.enabledDates, true)
    });

    component.selected = new Date(2022, 0, 5);
    expect(component.isSelected(new Date(2022, 0, 5))).toBe(true);

    expect(component.isSelected(new Date(2022, 0, 6))).toBe(false);

    const disabled = new Date(2022, 0, 7);
    expect(component.isDisabled(disabled)).toBe(true);
    expect(component.isSelected(disabled)).toBe(false);
  });
});
