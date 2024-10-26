import { CategoryB } from './category-b';

export interface CategoryTranslationB {
  id: number;
  categoryName: string;
  description?: string;
  categoryId: number;
  category: CategoryB;
}
