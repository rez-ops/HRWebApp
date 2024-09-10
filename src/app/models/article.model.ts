export interface Article {
  id: number;
  reference: string;
  machine_zone: string; // Ensure consistency with backend property name
  quantiteDemander: number; 
}