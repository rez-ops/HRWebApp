import { badgeManquant } from './../models/badgeManquant.model';
import { ChangementHoraire } from './../models/changementHoraire.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service1Service } from '../service1.service';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import Swal2 from 'sweetalert2';
@Component({
  selector: 'app-changement-horaire',
  templateUrl: './changement-horaire.component.html',
  styleUrls: ['./changement-horaire.component.css']
})
export class ChangementHoraireComponent implements OnInit {
  ChangementHoraire:ChangementHoraire={
    date:new Date(),
    idTypeShift: 0,
    userId: -1
  }
  user: any;

  constructor(
    private service1Service: Service1Service,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.ChangementHoraire.userId = this.user.id;
  }

  


  create(): void {
    if (this.isFormValid()){
      this.service1Service.createChangHoraire(this.user.matricule, this.ChangementHoraire).subscribe(
        (response: any) => {
          //this.affisuccesspopup("Changement Horaire created successfully");
          Swal2.fire('Changement Horaire created successfully', 'You clicked the button!', 'success');
          this.resetForm();
          this.router.navigate(['/historique'], { queryParams: { type: 'changementHoraire' } });
        },
        (error: any) => {
          console.error('Error dans la creation de changement horaire demande:', error);
          Swal2.fire('Error dans la creation de changement horaire demande:. Veuillez réessayer plus tard.', 'error');
          //this.affisuccesspopup('Error dans la creation de changement horaire demande:. Veuillez réessayer plus tard.');
          
        }
      );
    }else{
      Swal2.fire('Erreur lors de la création du congé. Veuillez réessayer plus tard.', 'You clicked the button!', 'error');
    }
  }

  affisuccesspopup(msg: string) {
    const modalElement: any = document.getElementById('successModal');
    const modalBodyElement: any = modalElement.querySelector('.modal-body');
    
    // Mettre à jour le contenu de la modale avec le message
    modalBodyElement.textContent = msg;
    
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  
    setTimeout(() => {
      bootstrapModal.hide();
    }, 2000);
  }



  resetForm() {
    this.ChangementHoraire = {
      date: new Date(),
      idTypeShift: 0, 
      userId:-1
    };
  }
  

  isFormValid(): boolean {
    return !!this.ChangementHoraire.date && this.ChangementHoraire.idTypeShift > 0;
  }
  
  
  
}


