import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HistoryCardComponent } from '../history-card/history-card.component';

@Component({
  selector: 'app-history',
  imports: [CommonModule, HistoryCardComponent],
  templateUrl: './history.component.html'
})
export class HistoryComponent {
  histories = [
    {
      source: 'Source Abasdf',
      destination: 'Destination Abasdf',
      date: '2021-01-01',
      distance: '100'
    },
    {
      source: 'Source B',
      destination: 'Destination B',
      date: '2021-01-02',
      distance: '200'
    },
    {
      source: 'Source C',
      destination: 'Destination C',
      date: '2021-01-03',
      distance: '300'
    }
  ];
}
