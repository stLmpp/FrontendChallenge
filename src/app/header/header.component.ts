import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Renderer2 } from '@angular/core';
import { Stores } from '../shared/store/stores';
import { DOCUMENT } from '@angular/common';
import { DialogService } from '../shared/dialog/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    private stores: Stores,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2,
    private dialogService: DialogService
  ) {
    this.stores.fromJSON(
      JSON.stringify({
        team: {
          json: '{"teams":[{"name":"G2 Esports","subTitle":"Team 1","description":"Team 1","id":1},{"name":"Very very very long name","subTitle":"Team 2","description":"Team 2","id":2},{"name":"Team 3","subTitle":"Team 3","description":"Team 3","id":3},{"name":"Team 4","subTitle":"Team 4","description":"Team 4","id":4},{"name":"Team 5","subTitle":"Team 5","description":"Team 4","id":5},{"name":"Team 6 ","subTitle":"Team 6","description":"Team 6","id":6},{"name":"Team 7","subTitle":"Team 7","description":"Team 7","id":7},{"name":"Team 8","subTitle":"Team 8","description":"Team 8","id":8}]}',
          uid: 9,
        },
        game: {
          json: '{"games":[{"idTournament":1,"idPhase":1,"id":1,"idTeamA":1,"idTeamB":2,"winner":1},{"idTournament":1,"idPhase":1,"id":2,"idTeamA":3,"idTeamB":4,"winner":3},{"idTournament":1,"idPhase":1,"id":3,"idTeamA":5,"idTeamB":6,"winner":6},{"idTournament":1,"idPhase":1,"id":4,"idTeamA":7,"idTeamB":8,"winner":7},{"idTournament":1,"idPhase":2,"id":5,"idTeamA":1,"idTeamB":3,"winner":3},{"idTournament":1,"idPhase":2,"id":6,"idTeamA":6,"idTeamB":7,"winner":7},{"idTournament":1,"idPhase":3,"id":7,"idTeamB":7,"idTeamA":3,"winner":3},{"idTournament":1,"idPhase":4,"id":8,"idTeamA":3},{"idTournament":2,"idPhase":5,"id":9,"idTeamA":1,"idTeamB":2},{"idTournament":2,"idPhase":5,"id":10,"idTeamA":3,"idTeamB":4},{"idTournament":2,"idPhase":6,"id":11}]}',
          uid: 12,
        },
        phase: {
          json: '{"phases":[{"idTournament":1,"number":1,"id":1},{"idTournament":1,"number":2,"id":2},{"idTournament":1,"number":3,"id":3},{"idTournament":1,"number":4,"id":4},{"idTournament":2,"number":1,"id":5},{"idTournament":2,"number":2,"id":6},{"idTournament":2,"number":3,"id":7}]}',
          uid: 8,
        },
        tournament: {
          json: '{"tournaments":[{"name":"teste","id":1,"idTeams":[1,2,5,6,4,3,7,8],"idGames":[]},{"name":"Tournament 2","id":2,"idTeams":[1,3,4,2]}]}',
          uid: 3,
        },
      })
    );
  }

  loading = false;

  async onLoad($event: Event): Promise<void> {
    this.loading = true;
    const input = $event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      this.loading = false;
      return;
    }
    const json = await file.text();
    this.stores.fromJSON(json);
    this.loading = false;
    this.changeDetectorRef.markForCheck();
  }

  onSave(): void {
    const json = this.stores.toJSON();
    const aElement: HTMLAnchorElement = this.renderer2.createElement('a');
    const file = new Blob([json], { type: 'application/json' });
    this.renderer2.setProperty(aElement, 'href', URL.createObjectURL(file));
    const date = new Date();
    const fileName = `summoners-rift-save-${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.json`;
    this.renderer2.setProperty(aElement, 'download', fileName);
    aElement.click();
  }

  onReset(): void {
    this.dialogService
      .confirm({ title: 'Reset all data?', btnYes: 'Reset', btnNo: 'Close', content: `This action can't be undone` })
      .subscribe(result => {
        if (result) {
          this.stores.reset();
        }
      });
  }
}
