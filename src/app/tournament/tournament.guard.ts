import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteParamEnum } from '../models/route-param.enum';
import { TournamentService } from '../services/tournament.service';

@Injectable({ providedIn: 'root' })
export class TournamentGuard implements CanActivate {
  constructor(private tournamentService: TournamentService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const idTournament = route.paramMap.get(RouteParamEnum.idTournament);
    if (!idTournament) {
      return false;
    }
    if (/\D+/.test(idTournament)) {
      return this.router.createUrlTree(['/tournament', this.tournamentService.nextUid()]);
    }
    return true;
  }
}
