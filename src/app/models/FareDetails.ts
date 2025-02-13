export class FareDetails {
    source: string;
    destination: string;
    date: string;
    distance: number;
    olaBike!: Ride; 
    olaAuto!: Ride;
    olaCab!: Ride;
    uberBike!: Ride;
    uberAuto!: Ride;
    uberCab!: Ride;
    
    constructor(source: string, destination: string, distance: number, uber: Ride[], ola: Ride[],date = new Date().toISOString()){
        this.source = source;
        this.destination = destination;
        this.date = date;
        this.distance = Math.floor(distance);        
        for(let i of uber){
            if(i.vehicleType === 'BIKE'){
                this.uberBike = i;
            }else if(i.vehicleType === 'AUTO'){
                this.uberAuto = i;
            }else if(i.vehicleType === 'CAB'){
                this.uberCab = i;
            }
        }
        for(let i of ola){
            if(i.vehicleType === 'BIKE'){
                this.olaBike = i;
            }else if(i.vehicleType === 'AUTO'){
                this.olaAuto = i;
            }else if(i.vehicleType === 'CAB'){
                this.olaCab = i;
            }
        }
    }

}

export interface Ride{
    totalFare: number;
    eta: number;
    vehicleType: string;
}