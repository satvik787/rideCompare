import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./AuthService";
import { environment } from "../../environments/environment.development";
import { FareDetails } from "../models/FareDetails";
import { Observable ,of} from "rxjs";

@Injectable({providedIn:"root"})
export class FetchService{

    constructor(private httpClient: HttpClient,private authService:AuthService) {}


    getUserHistory():Observable<FareDetails[]>{
        const token:string | null = localStorage.getItem("token");
        if(token){
            
            return this.httpClient.get<FareDetails[]>(environment.apiUri+"/history",{headers:{"Authorization":token}});
        }
        return of([]);
    }

    getFareDetails(rideDetails:{source:string,destination:string,distance:number,eta:number}):Observable<any>{
        const token = localStorage.getItem("token");
        if(!token){
            return of();
        }
        
        return this.httpClient.post<FareDetails>(environment.apiUri + "/fare", rideDetails, { headers: { "Authorization": token } });
    }

}