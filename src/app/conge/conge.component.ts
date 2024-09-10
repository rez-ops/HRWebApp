import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Service1Service } from '../service1.service';
import { Conge } from '../models/conge.model';
import * as bootstrap from 'bootstrap';
import Swal2 from 'sweetalert2';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit {
  conge: Conge = {
    dateSortie:new Date(),
    dateEntre:new Date(),
    userId: -1,
    idTypeConge: 0
    
  };
  congeTypes: any[] = []; 
  user: any;

  constructor(
    private service1Service: Service1Service,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.conge.userId = this.user.id;
    this.getCongeTypes();
  }
 
  create() {
    if (this.isFormValid()) {
      console.log(this.conge)
      this.service1Service.createConge(this.user.matricule, this.conge).subscribe(
        (response: any) => {
          console.log(response)
          //this.affisuccesspopup("Compensation  created successfully");
          Swal2.fire('Compensation  created successfully', 'You clicked the button!', 'success');
          this.resetForm();
          this.router.navigate(['/historique'], { queryParams: { type: 'conge' } });
        },
        (error: any) => {
          console.error('Error creating conge:', error);
          //this.affisuccesspopup('Erreur lors de la création du congé. Veuillez réessayer plus tard.');
          Swal2.fire('Erreur lors de la création du congé. Veuillez réessayer plus tard.', 'You clicked the button!', 'error');
          
        }
      );
    }else{
      Swal2.fire('Erreur lors de la création du congé. Veuillez réessayer plus tard.', 'You clicked the button!', 'error');
    }
   
  }
  getCongeTypes(): void {
    this.service1Service.getCongeTypes().subscribe(
      (data: any[]) => {
        this.congeTypes = data;
      },
      (error) => {
        console.error('Error fetching conge types:', error);
      }
    );
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
    this.conge={
      dateSortie:new Date(),
    dateEntre:new Date(),
    userId: -1,
    idTypeConge: 0
    }

  }

  isFormValid(): boolean {
    return this.conge.dateSortie && this.conge.dateEntre && this.conge.idTypeConge > 0;
  }
}
function Swal(arg0: string, arg1: string, arg2: string) {
  throw new Error('Function not implemented.');
}

