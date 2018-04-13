import { Component, OnInit, Input } from '@angular/core';
import { LocationService } from '../services/locations.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-spinning',
  templateUrl: './spinning.component.html',
  styleUrls: ['./spinning.component.css']
})
export class SpinningComponent implements OnInit {

  @Input() locationName: string;
  @Input() locationStatus: boolean;
  @Input() locationId: number;
  @Input() index: number;
  isRollinSubscription: Subscription;
  isRollin:boolean;
  
  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.isRollinSubscription = this.locationService.isRollinSubject.subscribe(
      (isRollin: boolean) => {
        this.isRollin = isRollin;
      }
    );
    this.locationService.emitIsRollinSubject();
  }
  
  onToggle(){
    if(this.locationStatus === true){
      this.locationService.switchOffOne(this.index);
    }else if(this.locationStatus === false){
      this.locationService.switchOnOne(this.index);
    }
  }

}
