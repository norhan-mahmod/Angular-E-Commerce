import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { MainComponent } from './layouts/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';

export const routes: Routes = [
    {path:'' , redirectTo:'auth', pathMatch:'full'},
    {path:'auth', component:AuthComponent,children:[
        {path:'', redirectTo: 'login' , pathMatch:'full'},
        {path:'login', component:LoginComponent, title:'Login'},
        {path:'register',component:RegisterComponent, title:'Register'}
    ]},
    {path:'main',component:MainComponent , canActivate: [authGuard] , children:[
        {path:'', redirectTo:'home', pathMatch:'full'},
        {path:'home' , component:HomeComponent, title:'Home'},
        {path:'cart' , component:CartComponent, title:'Cart'},
        {path:'products' , component:ProductsComponent, title:'Products'},
        {path:'categories' , component:CategoriesComponent, title:'Categories'},
        {path:'brands' , component:BrandsComponent, title:'Brands'},
        {path : 'productDetails/:productId' , component : ProductDetailsComponent , title : 'Product Details'},
        {path : 'categoryDetails/:categoryId' , component : CategoryDetailsComponent , title : 'Category Details'},
        {path : 'brandDetails/:brandId' , component : BrandDetailsComponent , title : 'Brand Details'}
    ]},
    {path:'**',component:NotFoundComponent , title:'Error 404'}
];
