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
  ) {}

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
