import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {DeviceInterface} from '../types/device.interface';
import {DeviceFormValuesInterface} from '../types/device-form-values.interface';
import { ResponseInterface } from '../../../../shared/types/response.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {
  private toastrService = inject(ToastrService);

  url = '/device'
  http = inject(HttpClient);

  getDevices(): Observable<DeviceInterface[]> {
    return this.http.get<DeviceInterface[]>(this.url);
  }

  getDevice(id: string): Observable<DeviceInterface> {
    return this.http.get<DeviceInterface>(`${this.url}/${id}`);
  }

  create(data: DeviceFormValuesInterface): Observable<{id: string}> {
    return this.http.post<{id: string}>(`${this.url}/create`, data);
  }

  update(device: Partial<DeviceInterface>, id: string): Observable<ResponseInterface<null>> {
    return this.http.patch<ResponseInterface>(`${this.url}/${id}`, { device })
      .pipe(
        tap((res) => this.toastrService.success(res.message))
      );
  }
}
