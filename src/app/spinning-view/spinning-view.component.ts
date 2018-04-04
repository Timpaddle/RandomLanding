import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LocationService } from '../services/locations.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-spinning-view',
  templateUrl: './spinning-view.component.html',
  styleUrls: ['./spinning-view.component.css']
})
export class SpinningViewComponent implements OnInit, OnDestroy {

  locations: any[];
  locationSubscription: Subscription;
  tempLocations: any[];
  randomLocation: Object;
  roll: number;
  previousRoll: number;
  moreThanOne: boolean;
  moreThanOneSubscription: Subscription;
  animate: boolean = false;

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.moreThanOneSubscription = this.locationService.moreThanOneSubject.subscribe(
      (moreThanOne: boolean) => {
        this.moreThanOne = moreThanOne;
      }
    );
    this.locationService.emitMoreThanOneSubject();

    this.locationSubscription = this.locationService.locationSubject.subscribe(
      (locations: any[]) => {
        this.locations = locations;
      }
    );
    this.locationService.emitLocationSubject();
    this.reroll(); // init first value
  }

  rollInterval(){
    while(this.roll === this.previousRoll){ //not twice same value
      this.roll=this.locationService.getRand();
    }
    this.randomLocation = this.tempLocations[this.roll];
    this.previousRoll = this.roll;
    this.moreThanOne = false;
  }
  reroll(){
    this.tempLocations = this.locations.filter(location => location.status === true);
    this.animate=true;
    
    if(this.tempLocations.length > 1){ //si plus d'un spot à été sélectionné
      this.isOkToRoll();
      new Promise(
        (resolve, reject) => {
            setTimeout(
                () => {
                    clearInterval(rollAnimate);
                    this.moreThanOne = true;
                    resolve(true);
                }, 2000 
            );
        }
      );
      const rollAnimate = setInterval(() => { this.rollInterval(); }, 100);
      
    } else {
      alert("Please choose more than one location !");
      this.isOkToRoll();
    }
  }  

  onAllOn(){
    this.locationService.allOn();
    this.isOkToRoll();
  }
  onAllOff(){
    this.locationService.allOff();
    this.isOkToRoll();
  }

  isOkToRoll(){
    this.locationService.isOkToRoll();
    this.locationService.emitMoreThanOneSubject();
  }



  
  ngOnDestroy(){
    this.locationSubscription.unsubscribe();
    this.moreThanOneSubscription.unsubscribe();
  }

}
