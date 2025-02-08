import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { MappleSearchComponent } from '../mapple-search/mapple-search.component';
import { LocationPickerService } from '../service/LocationPickerService';

@Component({
  selector: 'app-fare',
  imports: [MapComponent, MappleSearchComponent],
  templateUrl: './fare.component.html',
  providers: [LocationPickerService], 
  standalone: true
})

export class FareComponent {
}
