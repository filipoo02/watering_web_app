import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { DevicesService } from '../../services/devices.service';
import { getDevicesActions } from '../actions';

@Injectable()
export class GetDevicesEffect {
  getDevices$ = createEffect(() =>
    this.action$.pipe(
      ofType(getDevicesActions.getDevices),
      switchMap(() => {
        return this.devicesService.getDevices().pipe(
          map((devices) => getDevicesActions.getDevicesSuccess({ devices })),
          catchError(() => of(getDevicesActions.getDevicesFailure()))
        );
      })
    )
  );

  constructor(
    private action$: Actions,
    private devicesService: DevicesService
  ) {}
}
