import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoBackComponent {
  @Input() path: string | any[] = '../';
}
