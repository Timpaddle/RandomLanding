import { Component, OnInit, Input } from '@angular/core';
import { LocationService } from '../services/locations.service';

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
  
  constructor(private locationService: LocationService) { }

  ngOnInit() {
  }
  
  onToggle(){
    if(this.locationStatus === true){
      this.locationService.switchOffOne(this.index);
    }else if(this.locationStatus === false){
      this.locationService.switchOnOne(this.index);
    }
  }

}
