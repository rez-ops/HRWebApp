import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service1Service } from './../service1.service';
import * as bootstrap from 'bootstrap';
import Swal2 from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  matricule: string = '';
  password: string = '';

  constructor(private service1Service: Service1Service, private router: Router) {}

  login() {
   
      
    
    this.service1Service.login(this.matricule, this.password).subscribe(
      (response) => {
        if (response && response.id) {
          // Stocker les informations utilisateur dans le stockage local
          localStorage.setItem('user', JSON.stringify(response));
          Swal2.fire('login avec succee', 'Veuillez réessayer.', 'success');
          //this.affisuccesspopup('login avec succee');
          // Rediriger vers la page /conge
          this.router.navigate(['/conge']);
        } else {
          console.log('Matricule ou mot de passe incorrect.'); // Vérifiez que cela s'affiche dans la console
          // Afficher un message d'erreur
          Swal2.fire('Erreur : Matricule ou mot de passe incorrect.', 'Veuillez réessayer.', 'error');
        }
      },
      (error) => {
        // Handle server errors
        Swal2.fire('Erreur : Erreur de serveur. Veuillez réessayer plus tard.', 'Veuillez réessayer.', 'error');
        //this.affisuccesspopup('Erreur de serveur. Veuillez réessayer plus tard.');
        
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
  
}
