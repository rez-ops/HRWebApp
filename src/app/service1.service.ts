import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conge } from './models/conge.model';
import { badgeManquant } from './models/badgeManquant.model';
import { ChangementHoraire } from './models/changementHoraire.model';
import { timeAdgesment } from './models/timeAdjusment.model';
import { User } from './models/user.model';
import { Comande } from './models/comande.model';

@Injectable({
  providedIn: 'root'
})
export class Service1Service {

  private baseUrl = 'http://localhost:5229'; 
  private apiEndpoints = {
    login: `${this.baseUrl}/user/login`,
    createConge: `${this.baseUrl}/createConge`,
    createBadge: `${this.baseUrl}/createBadgeManquant`,
    createChangementHoraire: `${this.baseUrl}/createChangementHoraire`,
    createPermision: `${this.baseUrl}/createPermission`,
    createCompensation: `${this.baseUrl}/createCompensation`,
    AllUsers: `${this.baseUrl}/api/User/allUsers`,
    deletUser:`${this.baseUrl}/delete`,
    updateUser:`${this.baseUrl}/UpdateUser`,
    addUser:`${this.baseUrl}/api/User/createUser`,
    conges:`${this.baseUrl}/api/User/conges`,
    BadgesManquantes:`${this.baseUrl}/api/User/badges`,
    ChangHoraires:`${this.baseUrl}/api/User/changements`,
    permisions:`${this.baseUrl}/api/User/permissions`,
    componsations:`${this.baseUrl}/api/User/compensations`,
    alltypes:`${this.baseUrl}/api/User/TypeConges`,
    searchDepartments:`${this.baseUrl}/api/User/search/departments`,
    searchArticle:`${this.baseUrl}/api/User/search/articles`,
    createComande:`${this.baseUrl}/api/User/createComande`,
  };

  constructor(private http: HttpClient) {}

  // Login method
  login(matricule: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiEndpoints.login, { matricule, password });
  }

  // Create conge method with matricule in the URL
  createConge(matricule: string, conge: Conge): Observable<any> {
    const url = `${this.apiEndpoints.createConge}/${matricule}`;
    return this.http.post<any>(url, conge);
  }

  // Create badge manquant
  createBadge(matricule: string, badgeManquant: badgeManquant): Observable<any> {
    const url = `${this.apiEndpoints.createBadge}/${matricule}`;
    return this.http.post<any>(url, badgeManquant);
  }

  // Create changement horaire
  createChangHoraire(matricule: string, changementHoraire: ChangementHoraire): Observable<any> {
    const url = `${this.apiEndpoints.createChangementHoraire}/${matricule}`;
    return this.http.post<any>(url, changementHoraire);
  }

  // Create permission
  createPermision(matricule: string, timeAdgesment: timeAdgesment): Observable<any> {
    const url = `${this.apiEndpoints.createPermision}/${matricule}`;
    return this.http.post<any>(url, timeAdgesment);
  }

  // Create compensation
  createCompensation(matricule: string, timeAdgesment: timeAdgesment): Observable<any> {
    const url = `${this.apiEndpoints.createCompensation}/${matricule}`;
    return this.http.post<any>(url, timeAdgesment);
  }

  // Authentication check
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  // Logout
  logout() {
    localStorage.removeItem('user');
    // Redirect user to login page if needed
  }
  getAllUsers():Observable<User[]>{
    
      return this.http.get<User[]>(this.apiEndpoints.AllUsers);
  }

  getAllconges(userId: number):Observable<Conge[]>{
    const url = `${this.apiEndpoints.conges}/${userId}`;
    return this.http.get<Conge[]>(url);
  }

  getAllbadges(userId: number):Observable<badgeManquant[]>{
    const url = `${this.apiEndpoints.BadgesManquantes}/${userId}`;
    return this.http.get<badgeManquant[]>(url);
  }
  getAllChangeHoraire(userId: number):Observable<ChangementHoraire[]>{
    const url = `${this.apiEndpoints.ChangHoraires}/${userId}`;
    return this.http.get<ChangementHoraire[]>(url);
  }
  getAllPermisions(userId: number):Observable<timeAdgesment[]>{
    const url = `${this.apiEndpoints.permisions}/${userId}`;
    return this.http.get<timeAdgesment[]>(url);
  }
  getAllCompensations(userId: number): Observable<timeAdgesment[]> {
    const url = `${this.apiEndpoints.componsations}/${userId}`;
    return this.http.get<timeAdgesment[]>(url);
}
getCongeTypes(): Observable<any[]> {
  const url = `${this.apiEndpoints.alltypes}`;
  return this.http.get<any[]>(url) ;
}

  deleteUser(userId: number): Observable<void> {
    const url = `${this.apiEndpoints.deletUser}/${userId}`;
    return this.http.delete<void>(url);
  }

  updateUser(userId: number, updatedUser: User): Observable<void> {
    const url = `${this.apiEndpoints.updateUser}/${userId}`;
    return this.http.put<void>(url, updatedUser);
  }
  addUser(newUser:User,userId: number): Observable<void> {
    const url = `${this.apiEndpoints.addUser}/${userId}`;
    return this.http.post<void>(url,newUser);
  }
  searchDepartments(query: string): Observable<any[]> {
    const url = `${this.apiEndpoints.searchDepartments}?query=${query}`;
    return this.http.get<any[]>(url);
  }
  searchArticle(query: string): Observable<any[]> {
    const url = `${this.apiEndpoints.searchArticle}?query=${query}`;
    return this.http.get<any[]>(url);
  }
  createCommande(commande: Comande,userId: number): Observable<any> {
    const url = `${this.apiEndpoints.createComande}/${userId}`;
    return this.http.post<any>(url, commande);
  }
  
  
}
