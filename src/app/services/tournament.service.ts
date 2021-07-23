import { Injectable } from '@angular/core';
import { Tournament, TournamentWithTeamsPhases, TournamentWithWinner } from '../models/tournament';
import { Store } from '../shared/store/store';
import { Stores } from '../shared/store/stores';
import { TeamService } from './team.service';
import { combineLatest, map, Observable } from 'rxjs';
import { GameService } from './game.service';
import { Team } from '../models/team';
import { filterNil } from '../utils/operators/filter-nil';
import { resolveUpdate } from '../utils/utils';
import { PhaseService } from './phase.service';
import { Phase } from '../models/phase';
import { Game } from '../models/game';

export interface TournamentState {
  tournaments: Tournament[];
}

export function tournamentTeamsValidation(tournament: Tournament): boolean {
  return tournament.idTeams.length > 1 && (tournament.idTeams.length === 2 || tournament.idTeams.length % 4 === 0);
}

@Injectable({ providedIn: 'root' })
export class TournamentService extends Store<TournamentState> {
  constructor(
    stores: Stores,
    private teamService: TeamService,
    private phaseService: PhaseService,
    private gameService: GameService
  ) {
    super(stores, 'tournament', { tournaments: [] });
  }

  add(dto: Omit<Tournament, 'id' | 'idTeams' | 'idPhases'>): Tournament {
    const tournament: Tournament = { ...dto, id: this.nextUid(), idTeams: [] };
    this.updateState(state => ({ ...state, tournaments: [...state.tournaments, tournament] }));
    return tournament;
  }

  update(idTournament: number, partial: Partial<Tournament> | ((tournament: Tournament) => Tournament)): void {
    const update = resolveUpdate(partial);
    this.updateState(state => ({
      ...state,
      tournaments: state.tournaments.map(tournament => {
        if (tournament.id === idTournament) {
          tournament = update(tournament);
        }
        return tournament;
      }),
    }));
  }

  addTeam(idTournament: number, idTeam: number): void {
    this.update(idTournament, tournament => ({ ...tournament, idTeams: [...tournament.idTeams, idTeam] }));
  }

  removeTeam(idTournament: number, idTeamRemove: number): void {
    this.update(idTournament, tournament => ({
      ...tournament,
      idTeams: tournament.idTeams.filter(idTeam => idTeam !== idTeamRemove),
    }));
  }

  selectTournament(idTournament: number): Observable<Tournament | undefined> {
    return this.selectState('tournaments').pipe(
      map(tournaments => tournaments.find(tournament => tournament.id === idTournament))
    );
  }

  selectTournamentsWithWinner(): Observable<TournamentWithWinner[]> {
    return combineLatest([this.selectState('tournaments'), this.teamService.selectState('teams')]).pipe(
      map(([tournaments, teams]) =>
        tournaments.map(tournament => {
          let tournamentWithWinner: TournamentWithWinner = tournament;
          if (tournamentWithWinner.idTeamWinner) {
            tournamentWithWinner = {
              ...tournamentWithWinner,
              teamWinner: teams
                .filter(team => tournament.idTeams.includes(team.id))
                .find(team => team.id === tournamentWithWinner.idTeamWinner),
            };
          }
          return tournamentWithWinner;
        })
      )
    );
  }

  selectTournamentWithTeamsOrCreate(idTournament: number): Observable<TournamentWithTeamsPhases> {
    return combineLatest([
      this.selectTournament(idTournament),
      this.teamService.selectState('teams'),
      this.phaseService.selectByIdTournamentWithGames(idTournament),
    ]).pipe(
      map(([tournament, teams, phases]) => {
        if (!tournament) {
          return;
        }

        const firstPhase = phases[0];
        // Create an array with the ids of the cdk-drop-lists available to drag and drop the teams
        const cdkDropLists = (firstPhase?.games ?? []).reduce(
          (accGame, game) => [
            ...accGame,
            `tournament-phase-${firstPhase.id}-game-${game.id}-team-a`,
            `tournament-phase-${firstPhase.id}-game-${game.id}-team-b`,
          ],
          [] as string[]
        );
        // Filter the teams that are in this tournament
        const teamsTournament = teams.filter(team => tournament.idTeams.includes(team.id));
        let tournamentWithTeamsPhases: TournamentWithTeamsPhases = {
          ...tournament,
          // Filter out the teams that are already in games
          teams: teamsTournament.filter(
            team =>
              !phases.some(phase => phase.games.some(game => game.idTeamA === team.id || game.idTeamB === team.id))
          ),
          phases,
          // Validation to create the phases
          createPhases: !tournamentTeamsValidation(tournament) || !!phases.length,
          cdkDropLists,
          // The last "game" needs to be set
          canFinish: !!phases[phases.length - 1]?.games?.[0]?.idTeamA,
        };
        if (tournamentWithTeamsPhases.idTeamWinner) {
          // Add the team winner
          tournamentWithTeamsPhases = {
            ...tournamentWithTeamsPhases,
            teamWinner: teamsTournament.find(team => team.id === tournamentWithTeamsPhases.idTeamWinner),
          };
        }
        return tournamentWithTeamsPhases;
      }),
      filterNil()
    );
  }

  selectTeamsAvailable(idTournament: number): Observable<Team[]> {
    return combineLatest([
      this.selectTournament(idTournament).pipe(filterNil()),
      this.teamService.selectState('teams'),
    ]).pipe(map(([tournament, teams]) => teams.filter(team => !tournament.idTeams.includes(team.id))));
  }

  createPhases(idTournament: number): void {
    const tournament = this.getState('tournaments').find(_tournament => _tournament.id === idTournament);
    if (!tournament || !tournamentTeamsValidation(tournament)) {
      return;
    }
    let teamsLength = tournament.idTeams.length;
    let phasesLength = 1;
    while (teamsLength > 1) {
      teamsLength = teamsLength / 2;
      phasesLength++;
    }
    const phaseDtos: Omit<Phase, 'id'>[] = Array.from({ length: phasesLength }, (_, index) => ({
      idTournament,
      number: index + 1,
    }));
    const phases = this.phaseService.addMany(phaseDtos);
    const gameDtos: Omit<Game, 'id'>[] = phases.reduce(
      (acc, phase) => [
        ...acc,
        ...Array.from({ length: Math.ceil(tournament.idTeams.length / phase.number / 2) }, () => ({
          idTournament,
          idPhase: phase.id,
        })),
      ],
      [] as Omit<Game, 'id'>[]
    );
    this.gameService.addMany(gameDtos);
  }

  deletePhases(idTournament: number): void {
    this.phaseService.deleteByIdTournament(idTournament);
  }

  getTournament(idTournament: number): Tournament | undefined {
    return this.getState('tournaments').find(tournament => tournament.id === idTournament);
  }

  finishTournament(tournament: TournamentWithTeamsPhases): void {
    const lastPhase = tournament.phases[tournament.phases.length - 1];
    const idTeamWinner = lastPhase.games[0].idTeamA;
    if (!idTeamWinner) {
      return;
    }
    this.update(tournament.id, { finished: new Date(), idTeamWinner });
  }

  delete(idTournament: number): void {
    this.updateState(state => ({
      ...state,
      tournaments: state.tournaments.filter(tournament => tournament.id !== idTournament),
    }));
  }
}
