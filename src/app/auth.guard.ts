import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Service1Service } from './service1.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private service1Service: Service1Service, private router: Router) {}

  canActivate(): boolean {
    if (this.service1Service.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
