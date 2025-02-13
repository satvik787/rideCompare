import { Component, OnInit } from '@angular/core';
import { FareDetails } from '../models/FareDetails';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimeFormatPipe } from '../pipe/time-format.pipe';
@Component({
  selector: 'app-fare-details',
  imports: [CommonModule,TimeFormatPipe],
  templateUrl: './fare-details.component.html'
})
export class FareDetailsComponent  implements OnInit {
  fareDetails: FareDetails | undefined;
  
  ngOnInit() {
    this.fareDetails = history.state;
  }
}
