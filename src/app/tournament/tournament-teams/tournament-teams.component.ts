import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TournamentWithTeamsPhases } from '../../models/tournament';
import { trackById } from '../../utils/track-by';
import { Team } from '../../models/team';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatChipEvent } from '@angular/material/chips';
import { TournamentService } from '../../services/tournament.service';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-tournament-teams',
  templateUrl: './tournament-teams.component.html',
  styleUrls: ['./tournament-teams.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentTeamsComponent {
  constructor(private tournamentService: TournamentService) {}

  private readonly _teamTerm$ = new BehaviorSubject('');

  @Input() tournament!: TournamentWithTeamsPhases;
  @Input() teamsAvailable!: Team[];

  readonly teamTerm$ = this._teamTerm$.pipe(debounceTime(350));
  readonly trackById = trackById;

  onTeamSelected(idTournament: number, $event: MatOptionSelectionChange): void {
    this.tournamentService.addTeam(idTournament, $event.source.value);
  }

  onTeamTermInput($event: Event): void {
    const input = $event.target as HTMLInputElement;
    this._teamTerm$.next(input.value);
  }

  onTeamRemoved(idTournament: number, $event: MatChipEvent): void {
    this.tournamentService.removeTeam(idTournament, $event.chip.value);
  }
}
