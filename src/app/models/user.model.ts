export interface User {
  id: number;
  nom: string;
  prenom: string;
  matricule: number;
  shift: string; 
  direction: string;
  zone: string;
  password: string;
  role: string;
  totalLeaveDaysTaken: number;
  maxLeaveDaysPerYear: number;
  showDetail?: boolean;
}
