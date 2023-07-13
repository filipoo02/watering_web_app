import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastrTranslationService {
  constructor(
    private translate: TranslateService,
    private toastr: ToastrService
  ) {}

  success(dictionary: string): void {
    this.translate
      .get(dictionary)
      .pipe(
        first(),
        tap((message) => this.toastr.success(message))
      )
      .subscribe();
  }

  warning(dictionary: string): void {
    this.translate
      .get(dictionary)
      .pipe(
        first(),
        tap((message) => this.toastr.warning(message))
      )
      .subscribe();
  }

  error(dictionary: string): void {
    this.translate
      .get(dictionary)
      .pipe(
        first(),
        tap((message) => this.toastr.error(message))
      )
      .subscribe();
  }

  info(dictionary: string): void {
    this.translate
      .get(dictionary)
      .pipe(
        first(),
        tap((message) => this.toastr.info(message))
      )
      .subscribe();
  }
}
