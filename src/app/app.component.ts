import { Component, inject, OnDestroy } from '@angular/core';

import { AuthFacadeService } from './auth/store/auth-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private authFacadeService = inject(AuthFacadeService);
  title = 'watering_app';

  ngOnDestroy(): void {
    this.authFacadeService.logout();
  }
}
