import { Component,AfterViewInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { MappleSearchComponent } from '../mapple-search/mapple-search.component';
import { LocationPickerService } from '../service/LocationPickerService';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MapplsDistanceAndEta } from '../models/MapplsPlace';
import { FetchService } from '../service/FetchService';
import { FareDetails, Ride } from '../models/FareDetails';
import { TimeFormatPipe } from '../pipe/time-format.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fare',
  imports: [TimeFormatPipe,MapComponent, MappleSearchComponent,MatProgressSpinnerModule,CommonModule],
  templateUrl: './fare.component.html',
  providers: [LocationPickerService], 
  standalone: true
})

export class FareComponent implements AfterViewInit{

  public loader = false;
  
  constructor(private locationPickerService: LocationPickerService,private fetchService:FetchService,private router:Router){}
  
  public fareDetails:FareDetails | null = null; 
  public quickRide:Ride | null = null;
  public EconomyRide:Ride | null = null;


  ngAfterViewInit(): void {
    this.locationPickerService.getLoading().subscribe((loading:boolean)=>{
      this.loader = loading;
    });
  }

  handleCalculateFare(distance:MapplsDistanceAndEta){
    this.fetchService.getFareDetails(distance).subscribe((res)=>{
      let uber:Ride[] = [];
      let ola:Ride[] = [];
      const data:any[] = res.data;
      for(let i of data){
        if(i.provider == 'Uber')uber = i.rides;
        if(i.provider == 'Ola')ola = i.rides;
        for(let j of i.rides){
          if(this.quickRide == null || this.quickRide.eta > j.eta){
            this.quickRide = {...j};
            if(this.quickRide !== null){
              this.quickRide.vehicleType =  `${i.provider} ${j.vehicleType}`;
            }
          }
          if(this.EconomyRide == null || this.EconomyRide.totalFare > j.totalFare){
            this.EconomyRide = {...j};
            if(this.EconomyRide !== null){
              this.EconomyRide.vehicleType = `${i.provider} ${j.vehicleType}`;
            }
          }
        }
      }
      this.fareDetails = new FareDetails(distance.source,distance.destination,distance.distance,uber,ola);      
    });
  }

  handleCompareAll(){
    if(this.fareDetails === null)return;
    this.router.navigate(['/fare-details'], { state: this.fareDetails });
  }


}
