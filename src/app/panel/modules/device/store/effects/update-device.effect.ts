import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { DevicesService } from '../../services/devices.service';
import { updateDeviceActions } from '../actions/update-device.action';

@Injectable()
export class UpdateDeviceEffect {
  updateDevice$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateDeviceActions.updateDevice),
      switchMap(({ device, id }) =>
        this.devicesService.update(device, id).pipe(
          map(() => updateDeviceActions.updateDeviceSuccess()),
          catchError(() => of(updateDeviceActions.updateDeviceFailure())),
        ),
      ),
    ),
  );

  constructor(
    private action$: Actions,
    private devicesService: DevicesService,
  ) {}
}
