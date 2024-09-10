import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showNavbar: boolean = true;
  user: any = null;
  isLoginPage: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {
    // Met à jour l'utilisateur lors de l'initialisation du composant
    this.updateUser();

    // Abonnez-vous aux événements de navigation pour gérer l'affichage de la barre de navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = event.url !== '/login';
        this.updateUser();  // Met à jour l'utilisateur après la navigation
      }
    });



    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Vérifie si l'URL actuelle est '/login'
        this.isLoginPage = event.url === '/login';
      }
    });
  }

  clearLocalStorage() {
    // Vide le local storage
    localStorage.clear();

    // Réinitialise l'utilisateur dans le composant
    this.user = null;

    // Navigue vers la page de connexion
    this.router.navigate(['/login']).then(() => {
      // Actualise le composant après la navigation pour refléter les changements
      this.updateUser();
    });
  }

  // Méthode pour mettre à jour les données utilisateur
  updateUser() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }
}