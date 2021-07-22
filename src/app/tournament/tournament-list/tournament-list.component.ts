import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { trackById } from '../../utils/track-by';
import { FormControl } from '@angular/forms';
import { debounceTime, Observable, startWith, combineLatest, map } from 'rxjs';
import { search } from '../../shared/array/search.pipe';
import { Tournament } from '../../models/tournament';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TournamentListComponent {
  constructor(private tournamentService: TournamentService) {}

  readonly trackById = trackById;
  readonly termControl = new FormControl('');
  readonly term$: Observable<string> = this.termControl.valueChanges.pipe(debounceTime(350), startWith(''));
  readonly tournaments$: Observable<Tournament[]> = combineLatest([
    this.tournamentService.selectState('tournaments'),
    this.term$,
  ]).pipe(map(([tournaments, term]) => search(tournaments, 'name', term)));
}
