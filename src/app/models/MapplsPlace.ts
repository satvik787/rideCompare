
export default class MapplsPlace {
    placeName: string;
    eLoc: string;
    source: boolean;    

    constructor(placeName: string, eLoc: string, source: boolean) {
        this.placeName = placeName;
        this.eLoc = eLoc;
        this.source = source;
    }


}

export interface MapplsDistanceAndEta {
    distance: number;
    eta: number;
    source: string;
    destination: string;
}