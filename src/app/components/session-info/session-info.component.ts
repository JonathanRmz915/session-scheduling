import { Component, Input } from '@angular/core';
import { SessionPage } from '@app/models';

@Component({
  selector: 'app-session-info',
  templateUrl: './session-info.component.html',
  standalone: true,
})
export class SessionInfoComponent {
  @Input() sessionPage: SessionPage | null = null;

  get photo () {
    return this.sessionPage?.host.photo || 'https://www.gravatar.com/avatar/?d=mp';
  }

  get hostName() {
    return this.sessionPage ? `${this.sessionPage?.host.firstName} ${this.sessionPage?.host.lastName}` : '';
  }

  get profession () {
    return this.sessionPage?.host.profession;
  }

  get serviceTitle() {
    return this.sessionPage?.service.title;
  }

  get duration () {
    return this.sessionPage?.duration ?? '-';
  }
}
