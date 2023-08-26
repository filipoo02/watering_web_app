import { DeviceStateInterface } from '../types/device-state.interface';
import { createFeature, createReducer, on } from '@ngrx/store';

import { createDeviceActions, getDevicesActions } from './actions';
import { updateDeviceActions } from './actions/update-device.action';

const initialState: DeviceStateInterface = {
  devices: null,
  isLoading: null,
  isSubmitting: null,
  device: null,
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
    })),
    on(getDevicesActions.getDevice, (state) => ({ ...state, isLoading: true })),
    on(getDevicesActions.getDeviceSuccess, (state, { device }) => ({ ...state, isLoading: false, device })),
    on(getDevicesActions.getDeviceFailure, (state) => ({ ...state, isLoading: false })),
    on(updateDeviceActions.updateDevice, (state) => ({ ...state, isSubmitting: true })),
    on(updateDeviceActions.updateDeviceSuccess, (state) => ({ ...state, isSubmitting: false })),
    on(updateDeviceActions.updateDeviceFailure, (state) => ({ ...state, isSubmitting: false })),
  )
});

export const {
 name: deviceFeatureKey,
 reducer: deviceReducer,
 selectIsLoading,
 selectIsSubmitting,
 selectDevices,
  selectDevice,
} = deviceFeature;
