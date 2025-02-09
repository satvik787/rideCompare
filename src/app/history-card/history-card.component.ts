import { Component, HostBinding, Input } from '@angular/core';
import { FareHistory } from '../models/FareHistory';

@Component({
  selector: 'app-history-card',
  imports: [],
  templateUrl: './history-card.component.html',
})
export class HistoryCardComponent {
  @Input() fareHistory: FareHistory | undefined;
  @HostBinding('style.height') height = 'fit-content';
}
