import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { SpinningViewComponent } from './spinning-view/spinning-view.component';
import { SpinningComponent } from './spinning/spinning.component';
import { StatsViewComponent } from './stats-view/stats-view.component';

import { LocationService } from './services/locations.service';
import { StatsService } from './services/stats.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './header/header.component';
import { AddLocationComponent } from './add-location/add-location.component';




const appRoutes: Routes = [
  { path: 'random-landing', component: SpinningViewComponent },
  { path: 'session-stats', component: StatsViewComponent },
  { path: 'add-location', component: AddLocationComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: '**', redirectTo: 'random-landing' },
  { path: '', redirectTo: 'random-landing', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    SpinningViewComponent,
    SpinningComponent,
    StatsViewComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent,
    AddLocationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LocationService,
    StatsService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
