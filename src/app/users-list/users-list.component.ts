import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Service1Service } from '../service1.service';


import * as bootstrap from 'bootstrap';
import Swal2 from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string | null = null;
  selectedUser: User = this.initializeUser();
  newuser: User = this.initializeUser();
  user: any;
  ouruser: User = this.initializeUser();

  confpassword: string = '';
  addConfPassword: string = '';
  userId: number | null = null;
  showDetail:boolean = false;
  constructor(private service1Service: Service1Service) {}

  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getAllUsers();


    
  }

  initializeUser(): User {
    return {
      id: 0,
      nom: '',
      prenom: '',
      matricule: 0,
      shift: '0',
      direction: '0',
      zone: '0',
      role: '0',
      totalLeaveDaysTaken: 0,
      maxLeaveDaysPerYear: 0,
      password: ''
    };
  }
  toggleDetail(user: User) {
    if (this.ouruser === user) {
      // If the same user is clicked, toggle the visibility
      this.ouruser.showDetail = !this.ouruser.showDetail;
      this.ouruser= this.initializeUser();
    } else {
      // If a different user is clicked, show the details for the new user
      this.ouruser = user;
      this.ouruser.showDetail = true;
      
    }
  }
  
  
  

  getAllUsers(): void {
    this.service1Service.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        this.errorMessage = error?.error?.Message || 'An error occurred while fetching users.';
      }
    );
  }

  deleteUserById(id:number): void {
    Swal2.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service1Service.deleteUser(id).subscribe(
          () => {
            this.users = this.users.filter(user => user.id !== id);
            console.log('User deleted successfully');
            this.closeModal('deleteUserModal');
          }
        );
        Swal2.fire('Deleted!', 'Your imaginary file has been deleted.', 'success');
      } else if (result.dismiss === Swal2.DismissReason.cancel) {
        Swal2.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  
    
    if (this.userId !== null) {
      this.service1Service.deleteUser(this.userId).subscribe(
        () => {
          this.users = this.users.filter(user => user.id !== this.userId);
          console.log('User deleted successfully');
          this.closeModal('deleteUserModal');
        },
        (error) => {
          this.errorMessage = error?.error?.Message || 'An error occurred while deleting the user.';
        }
      );
    }
  }
  
  

  validatePasswords(): boolean {
    return this.newuser.password === this.confpassword;
  }

  validatePassword(): boolean {
    return this.newuser.password === this.addConfPassword;
  }

  updateUser(): void {
    if (!this.validatePasswords()) {
      this.errorMessage = 'Passwords do not match.';
      return; 
    }
    if (!this.newuser.nom || !this.newuser.prenom || this.newuser.matricule === 0 || 
      this.newuser.shift === '0' || this.newuser.direction === '0' || 
      this.newuser.zone === '0' || this.newuser.role === '0' || 
      this.newuser.maxLeaveDaysPerYear === 0 || !this.newuser.password) {
    
    this.errorMessage = 'All fields are required.';
    Swal2.fire('All fields are required.', ' :)', 'warning');
    return; // Stop execution if any required field is empty
  }

    if (this.selectedUser.id) {
      this.service1Service.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
        () => {
          console.log('User updated successfully');
          this.closeModal('updateUserModal');
          this.selectedUser = this.initializeUser(); // Reset the form after a successful update
          this.getAllUsers(); // Refresh the user list
        },
        (error) => {
          this.errorMessage = error?.error?.Message || 'An error occurred while updating the user.';
        }
      );
    }
  }

  addUser(): void {
    if (!this.validatePasswords()) {
      this.errorMessage = 'Passwords do not match.';
      Swal2.fire('Cancelled', 'Passwords do not match :)', 'warning');
      return; // Stop execution if passwords do not match
    }
    if (!this.newuser.nom || !this.newuser.prenom || this.newuser.matricule === 0 || 
      this.newuser.shift === '0' || this.newuser.direction === '0' || 
      this.newuser.zone === '0' || this.newuser.role === '0' || 
      this.newuser.maxLeaveDaysPerYear === 0 || !this.newuser.password) {
    
    this.errorMessage = 'All fields are required.';
    Swal2.fire('All fields are required.', ' :)', 'warning');
    return; // Stop execution if any required field is empty
  }
    this.service1Service.addUser(this.newuser, this.user.id).subscribe(
      () => {
        this.closeModal('addUserModel');
        this.newuser = this.initializeUser();
        this.confpassword = ''; // Clear the confirm password field
        this.addConfPassword = ''; // Clear the add user modal confirm password field
        this.getAllUsers();
      },
      (error) => {
        this.errorMessage = error?.error?.Message || 'An error occurred while adding the user.';
      }
    );
  }

  cancelUpdate(): void {
    this.selectedUser = this.initializeUser(); // Clear the form if update is canceled
  }

  selectUserForUpdate(user: User): void {
    this.selectedUser = { ...user };
    const modalElement: any = document.getElementById('updateUserModal');
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }

  selectUserForAdd(): void {
    const modalElement: any = document.getElementById('addUserModel');
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }


  

  closeModal(modalId: string): void {
    const modalElement: any = document.getElementById(modalId);
    if (modalElement) {
      const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
      if (bootstrapModal) {
        bootstrapModal.hide();
      } else {
        // Modal instance not found; create a new instance
        new bootstrap.Modal(modalElement).hide();
      }
    }
  }






  

}
