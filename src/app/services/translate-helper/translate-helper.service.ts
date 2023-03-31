import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { LangType } from './language.type';

@Injectable({
  providedIn: 'root',
})
export class TranslateHelperService {
  private langSubject = new Subject<LangType>();
  lang$ = this.langSubject.asObservable();

  constructor(private translateService: TranslateService) {}

  setLang(lang: LangType): void {
    if (this.translateService.currentLang === lang) {
      return;
    }

    this.translateService.use(lang);
    localStorage.setItem('lang', lang);
    this.langSubject.next(lang);
  }

  reload(translate: TranslateService): void {
    const currentLang = (localStorage.getItem('lang') || 'pl') as LangType;
    translate.currentLang = '';
    translate.use(currentLang);
  }
}
