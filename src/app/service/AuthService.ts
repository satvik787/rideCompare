import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Router } from "@angular/router";
@Injectable(
    {providedIn: 'root'}
)
export class AuthService {

    router = inject(Router);
    private _isLoggedIn: boolean = false;

    get isLoggedIn(): boolean { return this._isLoggedIn; }

    private _user: any;

    get user(): any { return this._user; }

    public resolved:Promise<boolean>;

    constructor(private http: HttpClient) { 
        const token = localStorage.getItem("token");
        this.resolved = new Promise((resolve) => {
            if (token) {
                http.get(environment.apiUri + "/me", { headers: { "Authorization": token } })
                .subscribe({
                    next: (data: any) => {
                        if(data.success){
                            this._isLoggedIn = true;
                            this._user = data.data;
                        }else{
                            this._isLoggedIn = false;
                        }
                        resolve(true);
                    },
                    error: (error: any) => {
                        this._isLoggedIn = false;
                        resolve(true);
                    }
                });
            } else {
                this._isLoggedIn = false;
                resolve(true);
            } 
        });
    }

    login(phone: string, password: string): Promise<{isLoggedIn: boolean, error?: string}> {
        return new Promise<{isLoggedIn:boolean,error:string}>((resolve) => {
            this.http.post(environment.apiUri + "/login", { phone, password },{observe:'response'})
            .subscribe({
                next: (response: any) => {
                    if(response.status == 200) {
                        localStorage.setItem("token",response.headers.get("Authorization"));                  
                        this._isLoggedIn = true;
                        this._user = response.body.data;                            
                        resolve({isLoggedIn:true,error:""});
                    }
                    else {
                        this._isLoggedIn = false;
                        console.log(response);
                        resolve({isLoggedIn:false,error:response.error?.join(",")});
                    }
                },
                error: ({error}) => {
                    this._isLoggedIn = false;
                    resolve({isLoggedIn:false,error:error?.errors?.join(",")});
                }
            });
        });

    }

    register(firstName:string,lastName:string,phone: string, password: string): Promise<{isLoggedIn: boolean, error?: string}> {
        return new Promise<{isLoggedIn: boolean, error?: string}>((resolve) => {
            this.http.post(environment.apiUri + "/register", { firstName, lastName, phone, password },{observe:'response'})
            .subscribe({
            next: (response: any) => {
                if(response.status == 200) {
                    this._isLoggedIn = true;
                    localStorage.setItem("token",response.headers.get("Authorization"));
                    this._user = response.body.data;                            
                    resolve({isLoggedIn:true,error:""});
                }
                else {
                    this._isLoggedIn = false;
                    resolve({isLoggedIn:false,error:response.error?.join(",")});
                }
            },
            error: ({error}) => {
                
                this._isLoggedIn = false;
                resolve({isLoggedIn:false,error:error?.errors?.join(",")});
            }
            });
        });
    }

    logout(){
        localStorage.removeItem("token");
        this._isLoggedIn = false;
        this._user = null;
        this.router.navigate(["/login"]);
    }

}