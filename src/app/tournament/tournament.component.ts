import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { RouteParamEnum } from '../models/route-param.enum';
import { filterNil } from '../utils/operators/filter-nil';
import { TournamentService } from '../services/tournament.service';
import { TournamentWithTeamsPhases } from '../models/tournament';
import { trackById } from '../utils/track-by';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentComponent {
  constructor(private activatedRoute: ActivatedRoute, private tournamentService: TournamentService) {}

  private readonly _idTournament$ = this.activatedRoute.paramMap.pipe(
    map(paramMap => paramMap.get(RouteParamEnum.idTournament)),
    filterNil(),
    map(Number)
  );

  readonly tournament$: Observable<TournamentWithTeamsPhases> = this._idTournament$.pipe(
    switchMap(idTournament => this.tournamentService.selectTournamentWithTeamsOrCreate(idTournament))
  );

  readonly teamsAvailable$ = this._idTournament$.pipe(
    switchMap(idTournament => this.tournamentService.selectTeamsAvailable(idTournament))
  );

  readonly trackById = trackById;

  onNameChange(idTournament: number, name: string): void {
    this.tournamentService.update(idTournament, { name });
  }

  createPhases(tournament: TournamentWithTeamsPhases): void {
    this.tournamentService.createPhases(tournament.id);
  }
}
