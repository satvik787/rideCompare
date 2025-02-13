import { Component, HostBinding, Input } from '@angular/core';
import { FareDetails } from '../models/FareDetails';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-card',
  imports: [CommonModule],
  templateUrl: './history-card.component.html',
})
export class HistoryCardComponent {
  @Input() fareHistory: FareDetails | undefined;
  @HostBinding('style.height') height = 'fit-content';
  @HostBinding('style.width') width = '100%';
  
  constructor(private router: Router) {
   }

  handleCardClick() {
    const state :any = this.fareHistory;
    const uber = [];
    const ola = [];
    for (let i of state.rideDetails) {
      if(i.provider ==  'Uber'){
        uber.push(i);
      }else if(i.provider == 'Ola'){
        ola.push(i);
      }
    }   
     
    this.router.navigate(['/fare-details'], { state: new FareDetails(state.source, state.destination, state.distance, uber, ola, state.requestTime) });
  }

}
