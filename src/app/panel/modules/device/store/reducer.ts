import { DeviceStateInterface } from '../types/device-state.interface';
import { createFeature, createReducer, on } from '@ngrx/store';

import { createDeviceActions, getDevicesActions } from './actions';

const initialState: DeviceStateInterface = {
  devices: [],
  isLoading: null,
  isSubmitting: null,
};

const deviceFeature = createFeature({
  name: 'device',
  reducer: createReducer(
    initialState,
    on(getDevicesActions.getDevices, (state) => ({ ...state, isLoading: true })),
    on(getDevicesActions.getDevicesSuccess, (state, action) => ({
      ...state,
      devices: action.devices,
      isLoading: false,
    })),
    on(getDevicesActions.getDevicesFailure, (state) => ({
      ...state,
      isLoading: false,
    })),
    on(createDeviceActions.createDevice, (state) => ({
      ...state,
      isSubmitting: true,
    })),
    on(createDeviceActions.createDeviceSuccess, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(createDeviceActions.createDeviceFailure, (state) => ({
      ...state,
      isSubmitting: false,
    }))
  )
});

export const {
 name: deviceFeatureKey,
 reducer: deviceReducer,
 selectIsLoading,
 selectIsSubmitting,
 selectDevices
} = deviceFeature;
