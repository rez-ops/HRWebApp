import { SidebarComponent } from './sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SetingComponent } from './seting/seting.component';
import { BadgeManquantComponent } from './badge-manquant/badge-manquant.component';
import { ChangementHoraireComponent } from './changement-horaire/changement-horaire.component';
import { CompensationComponent } from './compensation/compensation.component';
import { CongeComponent } from './conge/conge.component';
import { LoginComponent } from './login/login.component';
import { PermisionComponent } from './permision/permision.component';
import { UsersListComponent } from './users-list/users-list.component';
import { HistoriqueComponent } from './historique/historique.component';
import { ComandeMagasinComponent } from './comande-magasin/comande-magasin.component';

const routes: Routes = [
  { path: 'badgeManquant', component: BadgeManquantComponent },
  { path: 'changementHoraire', component: ChangementHoraireComponent },
  { path: 'compensation', component: CompensationComponent },
  { path: 'conge', component: CongeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'permision', component: PermisionComponent },
  { path: 'usersList', component: UsersListComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'sidbar', component:SidebarComponent },
  { path: 'magasin', component:ComandeMagasinComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
