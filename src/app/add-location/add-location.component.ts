import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '../models/location.model';
import { LocationService } from '../services/locations.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  locationForm: FormGroup;
  newLocationSubscription: Subscription;
  newLocations: Location[];

  constructor(private formBuilder: FormBuilder,
              private locationService: LocationService) { }

  ngOnInit() {
    this.initForm();
    this.newLocationSubscription = this.locationService.newLocationSubject.subscribe(
      (newLocations: Location[]) => {
        this.newLocations = newLocations;
      }
    );
    this.locationService.emitNewLocationSubject();

  }

  initForm(){
    this.locationForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSaveLocation(){
    const name = this.locationForm.get('name').value;
    const newLocation = new Location(name);
    newLocation.status=true;
    this.locationService.addLocation(newLocation);
    this.initForm();
  }

  onRemoveLocation(location: Location){
    this.locationService.removeLocation(location);
  }


}
