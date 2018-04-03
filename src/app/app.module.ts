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




const appRoutes: Routes = [
  { path: 'random-landing', component: SpinningViewComponent },
  { path: 'session-stats', component: StatsViewComponent },
  { path: '', component: SpinningViewComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SpinningViewComponent,
    SpinningComponent,
    StatsViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LocationService,
    StatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
