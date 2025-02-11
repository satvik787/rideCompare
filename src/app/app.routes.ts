import { Routes } from '@angular/router';
import { FareComponent } from './fare/fare.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { FareDetailsComponent } from './fare-details/fare-details.component';
import { loginRequiredGuard } from './login-required.guard';
export const routes: Routes = [
    {
        path: '',
        component: FareComponent,
        canActivate: [loginRequiredGuard]
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
