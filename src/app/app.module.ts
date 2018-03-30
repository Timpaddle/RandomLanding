import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { LocationService } from './services/locations.service';
import { SpinningViewComponent } from './spinning-view/spinning-view.component';
import { SpinningComponent } from './spinning/spinning.component';
import { SpinParamsComponent } from './spin-params/spin-params.component';


const appRoutes: Routes = [
  { path: 'random-landing', component: SpinningViewComponent },
  { path: '', component: SpinningViewComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SpinningViewComponent,
    SpinningComponent,
    SpinParamsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LocationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
