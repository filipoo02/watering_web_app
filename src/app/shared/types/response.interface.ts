import { HttpStatusCode } from '@angular/common/http';

export interface ResponseInterface<T = any> {
  statusCode: HttpStatusCode;
  message: string;
  data: T;
}
