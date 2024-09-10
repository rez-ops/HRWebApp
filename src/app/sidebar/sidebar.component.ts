import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isSidebarVisible = true;
  isSubmenuOpen = false;
  isDashboardSelected = false;
  user: any;

  constructor() {}

  ngOnInit() {
    // Si nécessaire, ajoutez ici tout code d'initialisation.
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }

  selectDashboard() {
    this.isDashboardSelected = true;
  }


 

}
