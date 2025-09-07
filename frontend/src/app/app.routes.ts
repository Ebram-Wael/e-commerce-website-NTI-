import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from '../app/components/register/register';
import { Products } from './components/products/products';

export const routes: Routes = [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'products', component: Products },
];
