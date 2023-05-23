import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppStateInterface} from './shared/types/app-state.interface';
import {logoutAction} from './auth/store/actions/logout.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'watering_app';

  constructor(private store: Store<AppStateInterface>) {}

  ngOnDestroy(): void {
    this.store.dispatch(logoutAction())
  }
}
