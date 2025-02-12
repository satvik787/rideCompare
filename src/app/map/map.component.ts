import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { LocationPickerService } from '../service/LocationPickerService';
import MapplsPlace, { MapplsDistanceAndEta } from '../models/MapplsPlace';
import { MapplsMarker } from '../models/MapplsMarker'; 
declare var mappls: any; 

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  standalone: true,
})

export class MapComponent implements AfterViewInit {

  constructor(private locationPickerService: LocationPickerService) {}


  @Output()
  public distance:EventEmitter<MapplsDistanceAndEta> = new EventEmitter<MapplsDistanceAndEta>();

  private map: any;
  private polyline: any;
  private sourceMarker: MapplsMarker | undefined = undefined;
  private destinationMarker: MapplsMarker | undefined = undefined;
  private sourcePlaceName: string = '';
  private destinationPlaceName: string = '';
  markerCallback(marker: MapplsMarker, location: MapplsPlace) {    
    this.locationPickerService.setLoading(false);
    const { lat, lng } = marker.obj.getPosition();    
    this.map.setCenter([lng, lat], 12);
    if (location.source) {
      if (this.sourceMarker) {
        this.sourceMarker.remove();
      }
      this.sourceMarker = marker;
      this.sourcePlaceName = location.placeName;
    } else {
      if (this.destinationMarker) {
        this.destinationMarker.remove();
      }
      this.destinationMarker = marker;
      this.destinationPlaceName = location.placeName;
    }
    if (this.sourceMarker && this.destinationMarker) {
      const { lng: start_lng, lat: start_lat } = this.sourceMarker.obj.getPosition();
      const { lng: end_lng, lat: end_lat } = this.destinationMarker.obj.getPosition();
      this.polyline?.setVisible(false);
      mappls.direction(
        { map: this.map, start: `${start_lat},${start_lng}`, end: `${end_lat},${end_lng}`, steps: false, stepIcon: false },
        (directions: any) => {          
          const path = directions.All_routes[0].getPath().map((p: [number, number]) => {
            return { lng: p[0], lat: p[1] };
          });
          directions.remove();
          this.polyline = new mappls.Polyline({
            map: this.map,
            path
          });
        }
      );
      mappls.getDistance({
        coordinates: `${start_lat},${start_lng};${end_lat},${end_lng}`,
        rtype: 1
      }, (data: any) => {
        const distance: any[] = data.results.distances[0];
        const eta: any[] = data.results.durations[0];
        if (distance.length > 0 && eta.length > 0) {
          this.distance.emit({ distance: distance[1] / 1000, eta: eta[1] / 60, source: this.sourcePlaceName, destination: this.destinationPlaceName });
        }
      });
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
        (marker:any)=>this.markerCallback(marker,location)
      );
    });
  }
}

