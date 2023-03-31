import { Component } from '@angular/core';

import { LangType } from './services/translate-helper/language.type';
import { TranslateHelperService } from './services/translate-helper/translate-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'watering_app';

  constructor(private translateHelperService: TranslateHelperService) {}

  changeLang(lang: LangType): void {
    this.translateHelperService.setLang(lang);
  }
}
