import { Injectable } from '@angular/core';
import { auditTime, share, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TournamentPhaseGameTeamConnectionService {
  private readonly _redrawConnections$ = new Subject<void>();

  readonly redrawConnections$ = this._redrawConnections$.asObservable().pipe(auditTime(250), share());

  redrawConnections(): void {
    this._redrawConnections$.next();
  }
}
