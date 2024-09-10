import { ChangementHoraire } from './../models/changementHoraire.model';
import { Component, Input, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Service1Service } from '../service1.service';
import { Conge } from '../models/conge.model';
import { data } from 'jquery';
import { badgeManquant } from '../models/badgeManquant.model';
import { timeAdgesment } from '../models/timeAdjusment.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  conges:Conge[]=[];
  badges:badgeManquant[]=[];
  ChangementHoraires:ChangementHoraire[]=[];
  permisions:timeAdgesment[]=[];
  componsations:timeAdgesment[]=[];
  @Input() user: any;
  errorMessage: any;
  constructor(private service1Service: Service1Service,private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(!this.user){
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }
    //this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.activateTab('#list-profile');
    this.getAllconges();
    this.getAllBadges();
    this.getAllChangeHoraire();
    this.getAllComponsation();
    this.getAllPermitions();




    this.route.queryParams.subscribe(params => {
      const tabType = params['type'];
      if (tabType) {
        this.setActiveTab(tabType);
      }
    });
  }

  activateTab(tabSelector: string): void {
    // Sélectionne l'onglet spécifié et l'affiche
    const tabElement = document.querySelector(tabSelector) as HTMLElement;
    if (tabElement) {
      const tab = new bootstrap.Tab(tabElement);
      tab.show();
    }
  }


  getAllconges():void{
    this.service1Service.getAllconges(this.user.id).subscribe(
      (data:Conge[])=>{
        this.conges=data
      },
      (error) => {
        this.errorMessage = error?.error?.Message || 'An error occurred while fetching conges.';
      }
    );
  }

  getAllBadges():void{
    this.service1Service.getAllbadges(this.user.id).subscribe(
      (data:badgeManquant[])=>{
        this.badges=data
      },
      (error) => {
        this.errorMessage = error?.error?.Message || 'An error occurred while fetching conges.';
      }
    );
  }
  getAllChangeHoraire(){
    this.service1Service.getAllChangeHoraire(this.user.id).subscribe(
      (data:ChangementHoraire[])=>{
        this.ChangementHoraires=data
      },
      (error) => {
        this.errorMessage = error?.error?.Message || 'An error occurred while fetching conges.';
      }
    );
  }
  getAllPermitions(){
    this.service1Service.getAllPermisions(this.user.id).subscribe(
      (data:timeAdgesment[])=>{
        this.permisions = data;
      },
      (error) => {
        this.errorMessage = error?.error?.Message || 'An error occurred while fetching permisions.';
      }
    );
}

getAllComponsation(){
    this.service1Service.getAllCompensations(this.user.id).subscribe(
      (data:timeAdgesment[])=>{
        this.componsations = data;
      },
      (error) => {
        this.errorMessage = error?.error?.Message || 'An error occurred while fetching compensations.';
      }
    );
}




activeTab: string = 'list-Conge';




  setActiveTab(tabType: string): void {
    switch (tabType) {
      case 'conge':
        this.activeTab = 'list-Conge';
        break;
      case 'badge':
        this.activeTab = 'list-BadgeManquant';
        break;
      case 'changementHoraire':
        this.activeTab = 'list-ChangementHoraire';
        break;
      case 'permision':
        this.activeTab = 'list-Permision';
        break;
      case 'componsation':
        this.activeTab = 'list-Componsation';
        break;
      default:
        this.activeTab = 'list-Conge'; // Onglet par défaut
    }
  }

}