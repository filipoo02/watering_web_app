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

  success(dictrionary: string): void {
    this.translate
      .get(dictrionary)
      .pipe(
        first(),
        tap((message) => this.toastr.success(message))
      )
      .subscribe();
  }

  warning(dictrionary: string): void {
    this.translate
      .get(dictrionary)
      .pipe(
        first(),
        tap((message) => this.toastr.warning(message))
      )
      .subscribe();
  }

  error(dictrionary: string): void {
    this.translate
      .get(dictrionary)
      .pipe(
        first(),
        tap((message) => this.toastr.error(message))
      )
      .subscribe();
  }
}
