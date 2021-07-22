import { InjectionToken, Type } from '@angular/core';
import { Store } from './store';

export const STORES_TOKEN = new InjectionToken<Type<Store<any>[]>>('STORES');
