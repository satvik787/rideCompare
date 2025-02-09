import { Component, Input,AfterViewInit ,ViewChild, ElementRef, HostBinding, HostListener, ChangeDetectionStrategy} from '@angular/core';
import { LocationPickerService } from '../service/LocationPickerService';
import MapplsPlace from '../models/MapplsPlace';
declare var mappls: any;


@Component({
  selector: 'app-mapple-search',
  imports: [],
  templateUrl: './mapple-search.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MappleSearchComponent implements AfterViewInit {
  @HostBinding('style.flexGrow') flexGrow: string = '1';
  

  @Input() placeholder: string = '';
  @Input() source: boolean = false;
  @ViewChild('search') search!: ElementRef;

  public id: string;

  constructor(private locationPickerService: LocationPickerService) {
    locationPickerService.incrementCnt();
    this.id = 'mappls-search-' + locationPickerService.getCnt(); 
  }

  @HostListener('click', ['$event']) 
  onPlaceClick(event: MouseEvent) {
    if (event.target instanceof HTMLLIElement) {
      this.locationPickerService.setLoading(true);
    }
  }

  callback(location: MapplsPlace[]) {    
    if(location.length === 0) return;
    location[0].source = this.source;
    this.search.nativeElement.value = location[0].placeName;
    this.locationPickerService.setLocation(location[0]);
  }

  


  ngAfterViewInit(): void {    
    const options = {
      region: 'IND',
      width: this.search.nativeElement.offsetWidth - 20,
      geolocation: this.source,
    }
    const search = new mappls.search(this.search.nativeElement, options, this.callback.bind(this));
  }


}
