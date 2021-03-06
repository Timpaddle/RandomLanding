import { Subject } from 'rxjs/Subject';
import { Location } from '../models/location.model';

export class LocationService{

    locationSubject = new Subject<Location[]>();
    newLocationSubject = new Subject<Location[]>();

    moreThanOneSubject = new Subject<boolean>();
    isRollinSubject = new Subject<boolean>();

    private isRollin = false;
    private moreThanOne = true;
    private locations = [
        {
            id:1,
            name: 'Anarchy Acres',
            status: true,
        },
        {
            id:2,
            name: 'Dusty Depot',
            status: true,
        },
        {
            id:3,
            name: 'Fatal Fields',
            status: true
        },
        {
            id:4,
            name: 'Flush Factory',
            status: true
        },
        {
            id:5,
            name: 'Greasy Grove',
            status: true
        },
        {
            id:6,
            name: 'Haunted Hills',
            status: true
        },
        {
            id:7,
            name: 'Junk Junction',
            status: true
        },
        {
            id:8,
            name: 'Lonely Lodge',
            status: true
        },
        {
            id:9,
            name: 'Loot Lake',
            status: true
        },
        {
            id:10,
            name: 'Lucky Landing',
            status: true
        },
        {
            id:11,
            name: 'Moisty Mire',
            status: true
        },
        {
            id:12,
            name: 'Pleasant Park',
            status: true
        },
        {
            id:13,
            name: 'Retail Row',
            status: true
        },
        {
            id:14,
            name: 'Salty Springs',
            status: true
        },
        
        {
            id:15,
            name: 'Shifty Shafts',
            status: true
        },
        {
            id:16,
            name: 'Snobby Shores',
            status: true
        },
        {
            id:17,
            name: 'Tilted Towers',
            status: true
        },
        {
            id:18,
            name: 'Tomato Town',
            status: true
        },
        {
            id:19,
            name: 'Wailing Woods',
            status: true
        }
    ];
    private newLocations = [];
    // private locations = this.tempLocations.filter(location => location.userId === 'hMpmyXK1HCP6WDLusT3ZAptYjOx2');

    emitNewLocationSubject(){
        this.newLocationSubject.next(this.newLocations);
    }
    emitLocationSubject(){        
        this.locationSubject.next(this.locations);
    }
    emitMoreThanOneSubject(){
        this.moreThanOneSubject.next(this.moreThanOne);
    }
    emitIsRollinSubject(){
        this.isRollinSubject.next(this.isRollin);
    }

    switchOnOne(i: number){
        this.locations[i].status = true;
        this.isOkToRoll();
        this.emitLocationSubject();
    }

    switchOffOne(i: number){
      this.locations[i].status = false;
      this.isOkToRoll();
      this.emitLocationSubject();
    }

    allOn(){
        for(let location of this.locations){
            location.status = true;
        }
        this.emitLocationSubject();
    }

    allOff(){
        for(let location of this.locations){
            location.status = false;
        }
        this.emitLocationSubject();
    }

    getRand():number{
        let range : number;
        range = this.locations.filter(location => location.status === true).length;
        if(range > 1){
            return Math.floor(Math.random()*range);
        } else {
            alert('Are you kidding me ? You allready know where to go');
        }
    }

    isOkToRoll(){
        if(this.locations.filter(location => location.status === true).length > 1){
            this.moreThanOne = true;
        }else{
            this.moreThanOne = false;
        }
        this.emitMoreThanOneSubject();
    }

    rollin(){
        this.isRollin = true;
        this.emitIsRollinSubject();
    }

    noRollin(){
        this.isRollin = false;
        this.emitIsRollinSubject();
    }

    addLocation(newLocation: Location){
        newLocation.id = this.locations.length+1;
        this.newLocations.push(newLocation);
        this.locations.push(newLocation);
        this.emitLocationSubject();
    }

    removeLocation(location: Location){
        const locationIndexToRemove = this.locations.findIndex(
            (locEl) => {
                if(locEl === location){
                    return true;
                }
            }
        );
        const newLocationIndexToRemove = this.newLocations.findIndex(
            (locEl) => {
                if(locEl === location){
                    return true;
                }
            }
        );
        this.locations.splice(locationIndexToRemove,1);
        this.newLocations.splice(newLocationIndexToRemove,1);
        this.emitNewLocationSubject();
        this.emitLocationSubject();
    }

    
}