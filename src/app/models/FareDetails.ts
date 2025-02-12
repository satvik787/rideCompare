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
    
    constructor(source: string, destination: string, distance: number, uber: Ride[], ola: Ride[]){
        this.source = source;
        this.destination = destination;
        this.date = new Date().toISOString();
        this.distance = distance;
        for(let i of uber){
            if(i.type === 'BIKE'){
                this.uberBike = i;
            }else if(i.type === 'AUTO'){
                this.uberAuto = i;
            }else if(i.type === 'CAB'){
                this.uberCab = i;
            }
        }
        for(let i of ola){
            if(i.type === 'BIKE'){
                this.olaBike = i;
            }else if(i.type === 'AUTO'){
                this.olaAuto = i;
            }else if(i.type === 'CAB'){
                this.olaCab = i;
            }
        }
    }

}

export interface Ride{
    totalFare: number;
    eta: number;
    type: string;
}