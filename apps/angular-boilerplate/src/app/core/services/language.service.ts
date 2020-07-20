import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '@env/environment';

import { AppConfigService } from './app-config.service';

/**
 * Language service
 */
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  /**
   * Set language from cookie or from config
   * @param cookieService Cookie service
   */
  constructor(private cookieService: CookieService) {}

  public get language() {
    return this.cookieService.check(environment.languageCookie)
      ? this.cookieService.get(environment.languageCookie)
      : AppConfigService.config
      ? AppConfigService.config.language
      : 'en';
  }

  public set language(language: string) {
    this.cookieService.set(environment.languageCookie, language, environment.cookieTime, '/');
  }
}
