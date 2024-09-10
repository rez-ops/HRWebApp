import { badgeManquant } from './../models/badgeManquant.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Service1Service } from '../service1.service';
import * as bootstrap from 'bootstrap';
import Swal2 from 'sweetalert2';
@Component({
  selector: 'app-badge-manquant',
  templateUrl: './badge-manquant.component.html',
  styleUrls: ['./badge-manquant.component.css']
})
export class BadgeManquantComponent implements OnInit {
  badgeManquant:badgeManquant={
    date: new Date(),
    entre: "0",
    sortie: "0",
    userId: 0
  }
  user: any;

  constructor(
    private service1Service: Service1Service,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.badgeManquant.userId = this.user.id;
  }

  
  // Handle form submission
  create(): void {
    if (this.isFormValid()) {
      this.service1Service.createBadge(this.user.matricule, this.badgeManquant).subscribe(
        (response: any) => {
          //this.affisuccesspopup("Badge created successfully");
          Swal2.fire('Badge created successfully', 'You clicked the button!', 'success');
          this.resetForm();
          this.router.navigate(['/historique'], { queryParams: { type: 'badge' } });
        },
        (error: any) => {
          console.error('Error creating badge:', error);
          Swal2.fire('Erreur lors de la création du badge. Veuillez réessayer plus tard.', 'You clicked the button!', 'error');
          //this.affisuccesspopup('Erreur lors de la création du badge. Veuillez réessayer plus tard.');
          
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

  resetForm(){
    this.badgeManquant={
      date: new Date(),
      entre: '0',
      sortie: '0',
      userId: 0
    }

  }


  isFormValid(): boolean {
    return (
      !!this.badgeManquant.date && // Ensure the date is provided
      (this.badgeManquant.entre != "" || this.badgeManquant.sortie !== "") // Ensure at least one of the 'entre' or 'sortie' fields is filled
    );
  }

  
  
}
