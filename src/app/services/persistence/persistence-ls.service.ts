import { Injectable } from '@angular/core';
import { PersistenceService } from './persistence';

/**
 * LocalStorage persistence service.
 */
@Injectable({ providedIn: 'root' })
export class PersistenceLsService extends PersistenceService {
  override setValue(key: string, value: unknown): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  override getValue<T>(key: string): T | null {
    const value = window.localStorage.getItem(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  }

  override deleteValue(key: string): void {
    if (!this.getValue(key)) {
      return;
    }

    window.localStorage.removeItem(key);
  }
}
