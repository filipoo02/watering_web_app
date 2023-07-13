import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

import { AppStateInterface } from '../../../../../shared/types/app-state.interface';
import { DevicesService } from '../../services/devices.service';
import { createDeviceActions } from '../actions';

@Injectable()
export class CreateDeviceEffect {
  createDevice$ = createEffect(() =>
    this.action$.pipe(
      ofType(createDeviceActions.createDevice),
      map((action) => action.data),
      switchMap((data) => {
        return this.devicesService.create(data).pipe(
          map(() => createDeviceActions.createDeviceSuccess()),
          catchError(() => of(createDeviceActions.createDeviceFailure()))
        );
      })
    )
  );

  createDeviceSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(createDeviceActions.createDeviceSuccess),
        tap(() => this.router.navigateByUrl('/device'))
      ),
    { dispatch: false }
  );

  constructor(
    private action$: Actions,
    private store: Store<AppStateInterface>,
    private devicesService: DevicesService,
    private router: Router
  ) {}
}
