export interface FareDetails {
    source: string;
    destination: string;
    date: string;
    distance: string;
    olaBike: Ride; 
    olaAuto: Ride;
    olaCab: Ride;
    uberBike: Ride;
    uberAuto: Ride;
    uberCab: Ride;
}

export interface Ride{
    cost: number;
    eta: number;
}