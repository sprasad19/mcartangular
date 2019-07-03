import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {  } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
//
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { HomeComponent } from './components/home/home.component';


import { RestapiService } from './services/restapi.service';
import { DataService } from './services/data.service';
import { MessageComponent } from './components/message/message.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardGuard } from './_gurd/auth-guard.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/profile/settings/settings.component';
import { AddressComponent } from './components/profile/address/address.component';
import { CategoriesComponent } from './components/products/categories/categories.component';
import { PostproductComponent } from './components/products/postproduct/postproduct.component';
import { MyporductComponent } from './components/products/myporduct/myporduct.component';
import { CatagoryComponent } from './components/products/catagory/catagory.component';
import { ProductComponent } from './components/products/product/product.component';
import { MycartComponent } from './components/products/mycart/mycart.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
    AddressComponent,
    CategoriesComponent,
    PostproductComponent,
    MyporductComponent,
    CatagoryComponent,
    ProductComponent,
    MycartComponent,
    // NgbRating
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    // PaginationModule,
    NgbModule,
    PaginationModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    // NgbRating
  ],
  providers: [ RestapiService,
               DataService,
               AuthGuardGuard
              ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
