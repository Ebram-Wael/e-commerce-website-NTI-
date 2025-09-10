import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from '../app/components/register/register';
import { Products } from './components/products/products';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AdminFormComponent }  from './components/admin-form/admin-form';
export const routes: Routes = [
        {
                path: '', component: MainLayoutComponent, children: [
                        { path: '', redirectTo: 'home', pathMatch: 'full' },
                        { path: 'home', component: HomeComponent, title: 'Home' },
                        { path: 'products', component: Products },
                        { path: 'products/:id', component: ProductDetailComponent },

                ]
        },
        { path: 'register', component: RegisterComponent },
        { path: 'login', component: LoginComponent },
        { path: 'adminform', component: AdminFormComponent },
        
];
