import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { RecaptchaModule } from 'ng-recaptcha';
import { EditComponent } from './edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { UserAddComponent } from './user-add/user-add.component';
import { UserApproveComponent } from './user-approve/user-approve.component';
import { UserViewComponent } from './user-view/user-view.component';
import { AgencyAddComponent } from './agency-add/agency-add.component';
import { SellerComponent } from './seller/seller.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { SearchComponent } from './search/search.component';
import { ListingComponent } from './listing/listing.component';
import { UserPocetnaComponent } from './user-pocetna/user-pocetna.component';
import { ProdavacPocetnaComponent } from './prodavac-pocetna/prodavac-pocetna.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { EditSellerComponent } from './edit-seller/edit-seller.component';
import { FavouriteListingsComponent } from './favourite-listings/favourite-listings.component';
import { ListingPreviewComponent } from './listing-preview/listing-preview.component';
import { MicrolocationAddComponent } from './microlocation-add/microlocation-add.component';
import { AdminKorisnikComponent } from './admin-korisnik/admin-korisnik.component';
import { CreateListingJsonComponent } from './create-listing-json/create-listing-json.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    RegisterComponent,
    EditComponent,
    PasswordChangeComponent,
    MainNavComponent,
    UserAddComponent,
    UserApproveComponent,
    UserViewComponent,
    AgencyAddComponent,
    SellerComponent,
    CreateListingComponent,
    SearchComponent,
    ListingComponent,
    UserPocetnaComponent,
    ProdavacPocetnaComponent,
    EditListingComponent,
    EditSellerComponent,
    FavouriteListingsComponent,
    ListingPreviewComponent,
    MicrolocationAddComponent,
    AdminKorisnikComponent,
    CreateListingJsonComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RecaptchaModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
