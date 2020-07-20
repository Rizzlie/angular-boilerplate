import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from '@app/core/services/language.service';

@Component({
  selector: 'angular-boilerplate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private translateService: TranslateService,
    private renderer: Renderer2,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.useLanguage(this.languageService.language);
  }

  useLanguage(language: string): void {
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);

    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setAttribute(document.documentElement, 'lang', language);
    }
  }
}
