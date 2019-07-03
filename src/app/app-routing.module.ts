import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/profile/settings/settings.component';
import { AddressComponent } from './components/profile/address/address.component';
import { AuthGuardGuard } from './_gurd/auth-guard.guard';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { PostproductComponent } from './components/products/postproduct/postproduct.component';
import { MyporductComponent } from './components/products/myporduct/myporduct.component';
import { CatagoryComponent } from './components/products/catagory/catagory.component';
import { ProductComponent } from './components/products/product/product.component';
import { MycartComponent } from './components/products/mycart/mycart.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'register',
    component: RegistrationComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'profile/settings',
    component: SettingsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'profile/address',
    component: AddressComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'profile/postproduct',
    component: PostproductComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'categories/:id',
    component: CatagoryComponent
  },
  {
    path: 'cart',
    component: MycartComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent
  },
  {
    path: 'profile/myproduct',
    component: MyporductComponent,
    canActivate: [AuthGuardGuard]
  },
  { path: '**', redirectTo: '' }
];
// /profile/address
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
