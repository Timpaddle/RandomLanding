import { Stats } from '../models/stats.model';
import { Subject } from 'rxjs/Subject';


export class StatsService{

    private stats: Stats[] = [
    ];

    statsSubject = new Subject<Stats[]>();

    emitStats(){
        this.statsSubject.next(this.stats);
    }

    addGameStats(stats: Stats){
        this.stats.push(stats);
        this.emitStats();
    }

    getGameNbr(){
        return this.stats.length+1;
    }

    

    resetStats(){
        this.stats = [];
    }
}