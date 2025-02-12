import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./AuthService";
import { environment } from "../../environments/environment.development";
import { FareDetails } from "../models/FareDetails";
import { Observable } from "rxjs";

@Injectable()
class FetchService{

    constructor(private httpClient: HttpClient,private authService:AuthService) {}


    getUserHistory():Observable<FareDetails[]>{
        return this.httpClient.get<FareDetails[]>(environment.apiUri+"/history",{withCredentials:true});
    }

    getFareDetails(rideDetails:{source:string,destination:string,distance:number,eta:number}):Observable<FareDetails>{
        return this.httpClient.post<FareDetails>(environment.apiUri + "/fare", rideDetails, { withCredentials: true });
    }

}