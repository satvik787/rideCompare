import { Component,AfterViewInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { MappleSearchComponent } from '../mapple-search/mapple-search.component';
import { LocationPickerService } from '../service/LocationPickerService';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MapplsDistanceAndEta } from '../models/MapplsPlace';

@Component({
  selector: 'app-fare',
  imports: [MapComponent, MappleSearchComponent,MatProgressSpinnerModule,CommonModule],
  templateUrl: './fare.component.html',
  providers: [LocationPickerService], 
  standalone: true
})

export class FareComponent implements AfterViewInit{

  public loader = false;
  
  constructor(private locationPickerService: LocationPickerService){}
  

  ngAfterViewInit(): void {
    this.locationPickerService.getLoading().subscribe((loading:boolean)=>{
      this.loader = loading;
    });
  }

  handleCalculateFare(distance:MapplsDistanceAndEta){
    
  }


}
