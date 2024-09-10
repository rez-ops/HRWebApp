import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';



import { SetingComponent } from './seting/seting.component';
import { HeaderComponent } from './header/header.component';
import { CongeComponent } from './conge/conge.component';
import { BadgeManquantComponent } from './badge-manquant/badge-manquant.component';
import { ChangementHoraireComponent } from './changement-horaire/changement-horaire.component';
import { PermisionComponent } from './permision/permision.component';
import { CompensationComponent } from './compensation/compensation.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersListComponent } from './users-list/users-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HistoriqueComponent } from './historique/historique.component';
import { ComandeMagasinComponent } from './comande-magasin/comande-magasin.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,


    SetingComponent,
    HeaderComponent,
    CongeComponent,
    BadgeManquantComponent,
    ChangementHoraireComponent,
    PermisionComponent,
    CompensationComponent,
    LoginComponent,
    UsersListComponent,
    HistoriqueComponent,
    ComandeMagasinComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // Ajoutez cette ligne
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
