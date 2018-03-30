import { Subject } from 'rxjs/Subject';

export class LocationService{

    locationSubject = new Subject<any[]>();

    moreThanOneSubject = new Subject<boolean>(); // => subject

    private moreThanOne = true;
    private locations = [
        {
            id:1,
            name: 'Anarchy Acres',
            status: true
        },
        {
            id:2,
            name: 'Dusty Depot',
            status: true
        },
        {
            id:13,
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

    emitLocationSubject(){
        this.locationSubject.next(this.locations.slice());
    }
    emitMoreThanOneSubject(){
        this.moreThanOneSubject.next(this.moreThanOne);
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
            console.log('You allready know where to go');
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

    
}