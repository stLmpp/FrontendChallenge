import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { RouteParamEnum } from '../models/route-param.enum';
import { filterNil } from '../utils/operators/filter-nil';
import { TournamentService } from '../services/tournament.service';
import { TournamentWithTeamsPhases } from '../models/tournament';
import { trackById } from '../utils/track-by';
import { DialogService } from '../shared/dialog/dialog.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private tournamentService: TournamentService,
    private dialogService: DialogService,
    private teamService: TeamService,
    private router: Router
  ) {}

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

  deletePhases(tournament: TournamentWithTeamsPhases): void {
    this.dialogService
      .confirm({ title: 'Delete phases?', content: `This action can't be undone`, btnNo: 'Cancel', btnYes: 'Delete' })
      .subscribe(result => {
        if (result) {
          this.tournamentService.deletePhases(tournament.id);
        }
      });
  }

  finishTournament(tournament: TournamentWithTeamsPhases): void {
    const idTeamWinner = tournament.phases[tournament.phases.length - 1].games[0].idTeamA;
    if (!idTeamWinner) {
      return;
    }
    const team = this.teamService.getTeam(idTeamWinner);
    if (!team) {
      return;
    }
    this.dialogService
      .confirm({
        title: 'Finish tournament?',
        content: `The winner of the tournament will be ${team.name} \nYou won't be able to modify the tournament after this`,
        btnYes: 'Finish',
        btnNo: 'Cancel',
      })
      .subscribe(result => {
        if (result) {
          this.tournamentService.finishTournament(tournament);
        }
      });
  }

  deleteTournament(tournament: TournamentWithTeamsPhases): void {
    this.dialogService
      .confirm({
        title: 'Delete tournament?',
        content: `This action can't be undone`,
        btnNo: 'Cancel',
        btnYes: 'Delete',
      })
      .subscribe(result => {
        if (result) {
          this.tournamentService.delete(tournament.id);
          this.router.navigate(['../list'], { relativeTo: this.activatedRoute }).then();
        }
      });
  }
}
