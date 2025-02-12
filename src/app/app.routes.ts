import { Routes } from '@angular/router';
import { FareComponent } from './fare/fare.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { FareDetailsComponent } from './fare-details/fare-details.component';
import { loginRequiredGuard } from './routeGuard/login-required.guard';
import { loggedInGuard } from './routeGuard/logged-in.guard';
import { historyResolver } from './resolver/history-resolver.resolver';
export const routes: Routes = [
    {
        path: '',
        component: FareComponent,
        canActivate: [loginRequiredGuard]
    },
    {
        path:'register',
        component: SignupComponent,
        canActivate: [loggedInGuard]
    },
    {
        path:'login',
        component: LoginComponent,
        canActivate: [loggedInGuard]
    },
    {
        path:'history',
        component: HistoryComponent,
        canActivate: [loginRequiredGuard],
        resolve: { histories: historyResolver }
    },
    {
        path: 'fare-details',
        component: FareDetailsComponent,
        canActivate: [loginRequiredGuard]
    }
];
