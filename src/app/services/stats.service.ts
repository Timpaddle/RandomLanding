import { Stats } from '../models/stats.model';
import { Subject } from 'rxjs/Subject';


export class StatsService{

    private stats: Stats[] = [];
    totDamages: number;
    statsSubject = new Subject<Stats[]>();
    bestGame: number;

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

    getBestGame(){
        // for(let stat of this.stats){
        //    return this.stats.indexOf(Math.max.apply(Math,this.stats.map(function(o){o.damages})));
           return this.stats.indexOf(Math.max.apply(Math,...this.stats.map(function(o){o.damages})));
        // }
    
    }
}