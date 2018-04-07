import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Stats } from '../models/stats.model';
import { StatsService } from'../services/stats.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-stats-view',
  templateUrl: './stats-view.component.html',
  styleUrls: ['./stats-view.component.css']
})
export class StatsViewComponent implements OnInit{
  @ViewChild('scrollable') private containerToScroll: ElementRef;

  statsForm: FormGroup;
  stats: Stats[];
  statsSubscription: Subscription;
  nbrGame: number;
  nbrKills: number;
  previousKillsValue: number;
  moyKills: number;
  compareKills: number;
  damages: number;
  moyDamages: number;
  previousDamagesValue: number;
  moyTop: number;
  previousTopValue: number;
  top: number;
  bestGame: number;


  constructor(private formBuilder: FormBuilder,
              private statsService: StatsService) { }

  ngOnInit() {
    this.initForm();
    this.previousKillsValue = 0;
    this.nbrKills = 0;
    this.moyKills = 0;
    this.nbrGame = 0;
    this.damages = 0;
    this.moyDamages = 0;
    this.previousDamagesValue = 0;
    this.top = 0;
    this.previousTopValue = 0;
    this.moyTop = 0;

    this.statsSubscription = this.statsService.statsSubject.subscribe(
      (stats: Stats[]) => {
        this.stats = stats;
      }
    );
    this.statsService.emitStats();
  }

  initForm(){
    this.statsForm = this.formBuilder.group({
      nbrKills: ['', Validators.required],
      top: ['', Validators.required],
      damages: ['', Validators.required]
    });
  }

  resetStats(){
    if(confirm('Etes-vous sûr de vouloir réinitialiser les stats ?')) {
      this.previousKillsValue = 0;
      this.previousDamagesValue = 0;
      this.nbrKills = 0;
      this.moyKills = 0;
      this.moyDamages = 0;
      this.damages = 0;
      this.moyTop = 0;
      this.statsService.resetStats();
      this.stats = [];
      this.nbrGame = 0;
    } else {
      return null;
    }
    
  }

  onSubmitForm() {
    // La méthode  onSubmitForm()  récupère la  value  du formulaire, et crée un nouvel objet User à partir de la valeur 
    // des controls  du formulaire. Ensuite, elle ajoute le nouvel utilisateur au service
    //  et navigue vers  /users  pour en montrer le résultat.
    const formValue = this.statsForm.value;
    this.nbrGame = this.statsService.getGameNbr();
    this.compareKills = formValue['nbrKills'];

    this.nbrKills = formValue['nbrKills'] + this.previousKillsValue;
    this.previousKillsValue = this.nbrKills;
    this.moyKills = this.nbrKills/this.nbrGame;

    this.damages = formValue['damages'] + this.previousDamagesValue;
    this.previousDamagesValue = this.damages;
    this.moyDamages = this.damages/this.nbrGame;

    this.top = formValue['top'] + this.previousTopValue;
    this.previousTopValue = this.top;
    this.moyTop = this.top/this.nbrGame;
    
    const gameStats = new Stats(
      formValue['nbrKills'],
      formValue['top'],
      formValue['damages']
    );
    
    this.statsService.addGameStats(gameStats);
    this.initForm();
    this.bestGame = this.statsService.getBestGame();
  }

  ngOnDestroy(){
    this.statsSubscription.unsubscribe();
  }

  getColor(){
    if(this.compareKills > this.moyKills){
      return 'green';
    } else if(this.compareKills < this.moyKills){
      return 'red';
    } else{
      return 'black';
    }
  }


}
