import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { GET_SESSION_PAGE, GET_AVAILABLE_DATE_TIMES } from '../graphql/queries';
import { DateAvailability, SessionPage } from '../models';

@Injectable({ providedIn: 'root' })
export class SessionsService {
  private apollo = inject(Apollo);

  getSessionPage(id: string): Observable<SessionPage> {
    return this.apollo
      .watchQuery<{ getSessionPage: SessionPage }>({
        query: GET_SESSION_PAGE,
        variables: { id },
        fetchPolicy: 'cache-first',
      })
      .valueChanges.pipe(map(r => r.data.getSessionPage));
  }

  getAvailableDateTimes(userId: string) {
    return this.apollo.watchQuery<{ getAvailableDateTimes: DateAvailability[] }>({
      query: GET_AVAILABLE_DATE_TIMES,
      variables: { userId },
      fetchPolicy: 'cache-first',
    })
      .valueChanges.pipe(map(r => r.data.getAvailableDateTimes
      ));
  }
}
