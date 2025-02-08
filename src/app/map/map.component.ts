import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LocationPickerService } from '../service/LocationPickerService';
import MapplsPlace from '../models/MapplsPlace';
import { MapplsMarker } from '../models/MapplsMarker';
import { retry } from 'rxjs';
declare var mappls: any; 

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  standalone: true
})

export class MapComponent implements AfterViewInit {

  constructor(private locationPickerService: LocationPickerService) {}

  private map: any;
  private sourceMarker: MapplsMarker | undefined = undefined;
  private destinationMarker: MapplsMarker | undefined = undefined;

  markerCallback(marker:MapplsMarker,source:boolean){
    const {lat,lng} = marker.obj.getPosition();    
    this.map.setCenter([lng,lat],12);
    if(source){
      if(this.sourceMarker)this.sourceMarker.remove();
      this.sourceMarker = marker;
    }else{
      if(this.destinationMarker)this.destinationMarker.remove();
      this.destinationMarker = marker;
    }
    if(this.sourceMarker && this.destinationMarker){
      const {lng:start_lng,lat:start_lat} = this.sourceMarker.obj.getPosition();
      const {lng: end_lng, lat: end_lat} = this.destinationMarker.obj.getPosition();
      mappls.direction(
        {map:this.map,start:`${start_lat},${start_lng}`,end:`${end_lat},${end_lng}`,steps:false,stepIcon:false},
        (directions:any)=>{
          const path = directions.All_routes[0].getPath().flat().map((p: [number, number]) => {
            return { lng: p[0], lat: p[1] };
          });
          new mappls.Polygon({
            map: this.map,
            path
        });
        }
      );
    }
  }

  ngAfterViewInit(): void {
    this.map = new mappls.Map('map-container', {
      center: [12.9716, 77.5946],
      zoom:15,
      zoomControl: false,
    });
    this.locationPickerService.getLocation().subscribe((location: MapplsPlace) => {
      mappls.pinMarker(
        {map:this.map,pin:location.eLoc},
        (marker:any)=>this.markerCallback(marker,location.source)
      );
    });
  }





}

