import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/schedule-session', pathMatch: 'full' },
  {
    path: 'schedule-session',
    loadComponent: () => import('./pages/schedule-session/schedule-session.component').then(c => c.ScheduleSessionComponent),
    children: [
      { path: '', redirectTo: 'schedule', pathMatch: 'full' },
      {
        path: 'schedule',
        loadComponent: () => import('./pages/schedule-session-wrapper/schedule-session-wrapper').then(c => c.ScheduleSessionWrapper),
        children: [
          { path: '', redirectTo: 'availability', pathMatch: 'full' },
          {
            path: 'availability',
            loadComponent: () => import('./pages/availability-wrapper/availability-wrapper.component').then(c => c.AvailabilityWrapperComponent),
          },
          {
            path: 'confirm-booking',
            loadComponent: () => import('./pages/confirm-booking/confirm-booking.component').then(c => c.ConfirmBookingComponent),
          }
        ]
      },
      {
        path: 'booking-successful',
        loadComponent: () => import('./pages/booking-successful/booking-successful.component').then(c => c.BookingSuccessfulComponent),
      },
    ]
  },
  { path: '**', redirectTo: '/schedule-session' },
];
