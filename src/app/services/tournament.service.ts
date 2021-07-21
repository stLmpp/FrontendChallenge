import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament';
import { Store } from '../store/store';
import { Stores } from '../store/stores';

export interface TournamentState {
  tournaments: Tournament[];
}

@Injectable()
export class TournamentService extends Store<TournamentState> {
  constructor(stores: Stores) {
    super(stores, 'tournament', { tournaments: [] });
  }
}
