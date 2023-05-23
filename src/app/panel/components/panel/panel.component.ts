import { Component } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStateInterface} from '../../../shared/types/app-state.interface';
import {logoutAction} from '../../../auth/store/actions/logout.action';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  constructor(private store: Store<AppStateInterface>) {
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
