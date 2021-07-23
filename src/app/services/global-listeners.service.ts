import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '../core/window.token';
import { auditTime, fromEvent, share } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalListenersService {
  constructor(@Inject(WINDOW) private window: Window) {}

  readonly windowResize$ = fromEvent(this.window, 'resize').pipe(auditTime(300), share());
}
