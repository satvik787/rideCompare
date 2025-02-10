import { Routes } from '@angular/router';
import { FareComponent } from './fare/fare.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { FareDetailsComponent } from './fare-details/fare-details.component';
export const routes: Routes = [
    {
        path: '',
        component: FareComponent
    },
    {
        path:'register',
        component: SignupComponent
    },
    {
        path:'login',
        component: LoginComponent
    },
    {
        path:'history',
        component: HistoryComponent
    },
    {
        path: 'fare-details',
        component: FareDetailsComponent
    }
];
