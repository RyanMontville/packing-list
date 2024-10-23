import { ApplicationConfig, provideZoneChangeDetection, isDevMode, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LocalService } from './services/local.service';
import { PwaService } from './services/pwa.service';

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    LocalService,
    PwaService,
    provideRouter(routes), provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }), 
    provideAnimationsAsync(),
    {provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true},]
};