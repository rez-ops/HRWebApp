import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service1Service } from '../service1.service';
import { Router } from '@angular/router';
import { timeAdgesment } from '../models/timeAdjusment.model';
import * as bootstrap from 'bootstrap';
import Swal2 from 'sweetalert2';
@Component({
  selector: 'app-compensation',
  templateUrl: './compensation.component.html',
  styleUrls: ['./compensation.component.css']
})
export class CompensationComponent implements OnInit {
  timeAdgesment: timeAdgesment = {
    date: new Date(),
    idTypeShift: 0,
    duHeure: "",
    auHeure: "",
    userId: -1
  };
  
  user: any;

  constructor(
    private service1Service: Service1Service,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.timeAdgesment.userId = this.user.id;
  }

  create(): void {
    if (this.isFormValid()) {
      this.service1Service.createCompensation(this.user.matricule, this.timeAdgesment).subscribe(
        (response: any) => {
          Swal2.fire('Compensation  created successfully', 'You clicked the button!', 'success');
          //this.affisuccesspopup('Compensation  created successfully');
          this.resetForm();
          this.router.navigate(['/historique'], { queryParams: { type: 'componsation' } });
        },
        (error: any) => {
          console.error('Error creating Permission:', error);
          Swal2.fire('Erreur lors de la création du congé. Veuillez réessayer plus tard.', 'You clicked the button!', 'error');
          //this.affisuccesspopup('Erreur lors de la création du Permission. Veuillez réessayer plus tard.');
          
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

  resetForm(): void {
    this.timeAdgesment = {
      date: new Date(),
      idTypeShift: 0,
      duHeure: "",
      auHeure: "",
      userId: -1
    };
  }

  isFormValid(): boolean {
    return (
      !!this.timeAdgesment.date &&
      this.timeAdgesment.duHeure != null &&
      this.timeAdgesment.auHeure != null
    );
  }
}
