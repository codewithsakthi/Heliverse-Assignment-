/// <reference types="@angular/localize" />
import { provideAnimations } from '@angular/platform-browser/animations';

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
