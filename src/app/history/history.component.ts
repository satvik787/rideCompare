import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HistoryCardComponent } from '../history-card/history-card.component';
import { FareDetails } from '../models/FareDetails';

@Component({
  selector: 'app-history',
  imports: [CommonModule, HistoryCardComponent],
  templateUrl: './history.component.html'
})
export class HistoryComponent {
  histories:FareDetails[] = [
    {
      source: 'sourcd Abasdf',
      destination: 'Destination Abasdf',
      date: '2021-01-01',
      distance: '100',
      olaBike: {cost: 50, eta: 10},
      olaAuto: {cost: 60, eta: 20},
      olaCab: {cost: 70, eta: 30},
      uberBike: {cost: 80, eta: 40},
      uberAuto:   {cost: 90, eta: 50},
      uberCab: {cost: 100, eta: 60}
    },
    {
      source: 'Source B',
      destination: 'Destination B',
      date: '2021-01-02',
      distance: '200',
      olaBike: {cost: 150, eta: 10},
      olaAuto: {cost: 160, eta: 20},
      olaCab: {cost: 170, eta: 30},
      uberBike: {cost: 180, eta: 40},
      uberAuto: {cost: 190, eta: 50},
      uberCab: {cost: 200, eta: 60}
    },
    {
      source: 'Source C',
      destination: 'Destination C',
      date: '2021-01-03',
      distance: '300',
      olaBike: {cost: 250, eta: 10},
      olaAuto: {cost: 260, eta: 20},
      olaCab: {cost: 270, eta: 30},
      uberBike: {cost: 280, eta: 40},
      uberAuto: {cost: 290, eta: 50},
      uberCab: {cost: 300, eta: 60}
    }
    
  ];
}
