import { ModuleWithProviders, NgModule, PLATFORM_ID } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatFormFieldDefaultOptions } from '@angular/material/form-field/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { WINDOW } from './window.token';
import { isPlatformBrowser } from '@angular/common';

@NgModule()
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
          useValue: { appearance: 'fill' } as MatFormFieldDefaultOptions,
        },
        {
          provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
          useValue: { duration: 5000 } as MatSnackBarConfig,
        },
        {
          provide: WINDOW,
          useFactory: (platform: string) => (isPlatformBrowser(platform) ? window : {}),
          deps: [PLATFORM_ID],
        },
      ],
    };
  }
}
