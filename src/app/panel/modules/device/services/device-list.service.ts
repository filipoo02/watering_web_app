import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DeviceInterface} from '../types/device.interface';
import {CreateDeviceInterface} from '../types/create-device.interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceListService {
  url = '/device'
  http = inject(HttpClient);

  getDevice(): Observable<DeviceInterface> {
    return this.http.get<DeviceInterface>(this.url);
  }

  create(data: CreateDeviceInterface): Observable<{id: string}> {
    return this.http.post<{id: string}>(`${this.url}/create`, data);
  }

  update(data: Partial<DeviceInterface>): Observable<DeviceInterface> {
    return this.http.patch<DeviceInterface>(this.url, data);
  }
}
