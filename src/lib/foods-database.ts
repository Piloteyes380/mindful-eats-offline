export interface Food {
  id: string;
  name: string;
  category: 'all' | 'protein' | 'grains' | 'veggies' | 'dairy';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

export const foodsDatabase: Food[] = [
  // Protein
  { id: '1', name: 'Chicken Breast', category: 'protein', calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: '100g' },
  { id: '2', name: 'Salmon', category: 'protein', calories: 208, protein: 22, carbs: 0, fat: 12, serving: '100g' },
  { id: '3', name: 'Eggs', category: 'protein', calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: '2 large' },
  { id: '4', name: 'Greek Yogurt', category: 'protein', calories: 100, protein: 10, carbs: 6, fat: 0.4, serving: '170g' },
  { id: '5', name: 'Tofu', category: 'protein', calories: 76, protein: 8, carbs: 1.9, fat: 4.8, serving: '100g' },
  { id: '6', name: 'Tuna', category: 'protein', calories: 144, protein: 30, carbs: 0, fat: 1, serving: '100g' },
  
  // Grains
  { id: '7', name: 'Brown Rice', category: 'grains', calories: 112, protein: 2.6, carbs: 23, fat: 0.9, serving: '100g cooked' },
  { id: '8', name: 'Quinoa', category: 'grains', calories: 120, protein: 4.4, carbs: 22, fat: 1.9, serving: '100g cooked' },
  { id: '9', name: 'Oats', category: 'grains', calories: 68, protein: 2.4, carbs: 12, fat: 1.4, serving: '40g dry' },
  { id: '10', name: 'Whole Wheat Bread', category: 'grains', calories: 82, protein: 4, carbs: 14, fat: 1.1, serving: '1 slice' },
  { id: '11', name: 'Pasta', category: 'grains', calories: 131, protein: 5, carbs: 25, fat: 1.1, serving: '100g cooked' },
  
  // Veggies
  { id: '12', name: 'Broccoli', category: 'veggies', calories: 25, protein: 3, carbs: 5, fat: 0.4, serving: '100g' },
  { id: '13', name: 'Spinach', category: 'veggies', calories: 7, protein: 0.9, carbs: 1.4, fat: 0.1, serving: '30g' },
  { id: '14', name: 'Sweet Potato', category: 'veggies', calories: 103, protein: 2.3, carbs: 24, fat: 0.1, serving: '130g' },
  { id: '15', name: 'Bell Pepper', category: 'veggies', calories: 20, protein: 1, carbs: 4.6, fat: 0.2, serving: '100g' },
  { id: '16', name: 'Carrots', category: 'veggies', calories: 25, protein: 0.5, carbs: 6, fat: 0.1, serving: '61g' },
  { id: '17', name: 'Avocado', category: 'veggies', calories: 160, protein: 2, carbs: 8.5, fat: 15, serving: '100g' },
  
  // Dairy
  { id: '18', name: 'Milk', category: 'dairy', calories: 42, protein: 3.4, carbs: 5, fat: 1, serving: '100ml' },
  { id: '19', name: 'Cheddar Cheese', category: 'dairy', calories: 113, protein: 7, carbs: 1, fat: 9, serving: '28g' },
  { id: '20', name: 'Cottage Cheese', category: 'dairy', calories: 98, protein: 11, carbs: 3.4, fat: 4.3, serving: '100g' },
  { id: '21', name: 'Mozzarella', category: 'dairy', calories: 85, protein: 6.3, carbs: 1, fat: 6.3, serving: '28g' },
  { id: '22', name: 'Butter', category: 'dairy', calories: 102, protein: 0.1, carbs: 0, fat: 11.5, serving: '14g' },
];

export const searchFoods = (query: string, category: string = 'all'): Food[] => {
  let filtered = foodsDatabase;
  
  if (category !== 'all') {
    filtered = filtered.filter(food => food.category === category);
  }
  
  if (query.trim()) {
    filtered = filtered.filter(food => 
      food.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  return filtered;
};

export const getFoodsByCategory = (category: string): Food[] => {
  if (category === 'all') return foodsDatabase;
  return foodsDatabase.filter(food => food.category === category);
};