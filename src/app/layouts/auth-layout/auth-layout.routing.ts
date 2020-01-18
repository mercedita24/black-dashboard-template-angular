import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';


export const AuthLayoutRoutes: Routes = [
    { path: 'auth/login', component: LoginComponent },
];
