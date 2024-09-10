import { data } from 'jquery';
import { Article } from './article.model';
import { Department } from './department.model';
import { User } from './user.model';
export interface Comande {
  costCenter: string;
  id: number;
  typeBon?: string; // Optional to match C# nullable string
  departmentId: number;
  userId: number;
  
  typePiece?: string; // Optional to match C# nullable string
  articles: Article[];
  date: Date; // Should be in ISO 8601 format
}
