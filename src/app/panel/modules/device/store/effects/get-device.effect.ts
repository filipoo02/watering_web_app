import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DevicesService } from '../../services/devices.service';
import { getDevicesActions } from '../actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class GetDeviceEffect {
  getDevice$ = createEffect(() => this.action$.pipe(
    ofType(getDevicesActions.getDevice),
    switchMap(({ id }) => this.devicesService.getDevice(id).pipe(
      map((device) => getDevicesActions.getDeviceSuccess({ device })),
      catchError(() => of(getDevicesActions.getDeviceFailure()))
    ))
  ))

  constructor(
    private action$: Actions,
    private devicesService: DevicesService
  ) {}
}
