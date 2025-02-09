import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import MapplsPlace from "../models/MapplsPlace";


@Injectable()
export class LocationPickerService {
    private location: Subject<MapplsPlace> = new Subject<MapplsPlace>();
    private loading: Subject<boolean> = new Subject<boolean>();
    private cnt = 0;



    setLoading(loading: boolean) {
        this.loading.next(loading);
    }

    getLoading() {
        return this.loading.asObservable();
    }

    setLocation(location: MapplsPlace) {
        this.location.next(location);
    }

    getLocation() {
        return this.location.asObservable();
    }

    getCnt() {
        return this.cnt;
    }

    incrementCnt() {
        this.cnt++;
    }

}

