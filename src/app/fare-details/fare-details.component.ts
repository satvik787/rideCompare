import { Component, OnInit } from '@angular/core';
import { FareDetails } from '../models/FareDetails';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-fare-details',
  imports: [CommonModule],
  templateUrl: './fare-details.component.html'
})
export class FareDetailsComponent  implements OnInit {
  fareDetails: FareDetails | undefined;
  
  ngOnInit() {
    this.fareDetails = history.state;
  }

}
