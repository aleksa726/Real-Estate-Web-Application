import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminKorisnikComponent } from './admin-korisnik/admin-korisnik.component';
import { AdminComponent } from './admin/admin.component';
import { AgencyAddComponent } from './agency-add/agency-add.component';
import { CreateListingJsonComponent } from './create-listing-json/create-listing-json.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { EditSellerComponent } from './edit-seller/edit-seller.component';
import { EditComponent } from './edit/edit.component';
import { FavouriteListingsComponent } from './favourite-listings/favourite-listings.component';
import { ListingPreviewComponent } from './listing-preview/listing-preview.component';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';
import { MicrolocationAddComponent } from './microlocation-add/microlocation-add.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { ProdavacPocetnaComponent } from './prodavac-pocetna/prodavac-pocetna.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { SellerComponent } from './seller/seller.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserApproveComponent } from './user-approve/user-approve.component';
import { UserPocetnaComponent } from './user-pocetna/user-pocetna.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'listing/:naslov', component: ListingComponent },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: 'home', component: UserPocetnaComponent },
      { path: 'changePassword', component: PasswordChangeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'favouriteListings', component: FavouriteListingsComponent },
      { path: 'listing/:naslov', component: ListingComponent }
    ]
  },
  {
    path: 'seller',
    component: SellerComponent,
    children: [
      { path: 'home', component: ProdavacPocetnaComponent },
      { path: 'changePassword', component: PasswordChangeComponent },
      { path: 'addListing', component: CreateListingComponent },
      { path: 'editListing/:naslov', component: EditListingComponent },
      { path: 'changeData', component: EditSellerComponent },
      { path: 'json', component: CreateListingJsonComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'changePassword', component: PasswordChangeComponent },
      { path: 'users', component: AdminKorisnikComponent },
      { path: 'addAgency', component: AgencyAddComponent },
      { path: 'edit/:username', component: EditComponent },
      { path: 'addMicrolocation', component: MicrolocationAddComponent }

    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
