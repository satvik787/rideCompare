import { Component, HostBinding, Input } from '@angular/core';
import { FareDetails } from '../models/FareDetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-card',
  imports: [],
  templateUrl: './history-card.component.html',
})
export class HistoryCardComponent {
  @Input() fareHistory: FareDetails | undefined;
  @HostBinding('style.height') height = 'fit-content';
  
  constructor(private router: Router) { }

  handleCardClick() {
    this.router.navigate(['/fare-details'], { state: this.fareHistory });
  }

}
