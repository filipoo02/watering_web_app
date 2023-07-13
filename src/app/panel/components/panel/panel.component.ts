import {Component, inject} from '@angular/core';

import {AuthFacadeService} from '../../../auth/store/auth-facade.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  private authFacadeService = inject(AuthFacadeService);

  logout(): void {
    this.authFacadeService.logout();
  }
}
