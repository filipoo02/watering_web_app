import {InjectionToken} from '@angular/core';
import {AppConfigInterface} from './app-config.interface';

export const APP_CONFIG = new InjectionToken<AppConfigInterface>('app.config');
