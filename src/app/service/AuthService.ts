import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
@Injectable(
    {providedIn: 'root'}
)
export class AuthService {

    private _isLoggedIn: boolean = false;

    get isLoggedIn(): boolean { return this._isLoggedIn; }

    private user: any;

    constructor(private http: HttpClient) { 
        console.log("AuthService constructor");
        
        http.get(environment.apiUri+"/me", {withCredentials:true})
        .subscribe({
            next:(data: any) => {
                console.log(data);            
            },
            error:(error: any) => {
                console.log(error);
                this._isLoggedIn = false;
            }
        });   
    }

    login(phone: string, password: string): Promise<{isLoggedIn: boolean, error?: string}> {
        return new Promise<{isLoggedIn:boolean,error:string}>((resolve, reject) => {
            this.http.post(environment.apiUri + "/login", { phone, password })
            .subscribe({
                next: (response: any) => {
                    if(response.success && response.data) {
                        this._isLoggedIn = true;
                        this.user = response.data;                            
                        resolve({isLoggedIn:true,error:""});
                    }
                    else {
                        this._isLoggedIn = false;
                        console.log(response);
                        resolve({isLoggedIn:false,error:response.error?.map((e: any) => e.message).join(",")});
                    }
                },
                error: (error: any) => {
                    this._isLoggedIn = false;
                    resolve({isLoggedIn:false,error:"Failed to login try again"});
                }
            });
        });

    }

    register(firstName:string,lastName:string,phone: string, password: string): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            this.http.post(environment.apiUri + "/register", { firstName,lastName, phone, password })
            .subscribe({
                next: (response: any) => {
                    if(response.status == 200 && response.data) {
                        this._isLoggedIn = true;
                        this.user = response.data;                            
                        resolve(true);
                    }
                    else {
                        this._isLoggedIn = false;
                        resolve(false);
                    }
                },
                error: (error: any) => {
                    this._isLoggedIn = false;
                    resolve(false);
                }
            });
        });
    }
}