// Local storage utilities for the calorie tracker

export interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: "breakfast" | "lunch" | "dinner" | "snacks";
  serving: string;
  date: string; // ISO date string
  time: string;
}

export interface Goals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Settings {
  notifications: boolean;
  reminderTime: string;
  waterReminders: boolean;
  darkMode: boolean;
  units: "metric" | "imperial";
  weekStartsOn: "monday" | "sunday";
}

// Keys for localStorage
const KEYS = {
  FOOD_ENTRIES: 'calorieTracker_foodEntries',
  GOALS: 'calorieTracker_goals',
  SETTINGS: 'calorieTracker_settings',
  WATER_INTAKE: 'calorieTracker_waterIntake'
};

// Food Entries
export const saveFoodEntry = (entry: Omit<FoodEntry, 'id'>): FoodEntry => {
  const newEntry: FoodEntry = {
    ...entry,
    id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
  
  const entries = getFoodEntries();
  const updatedEntries = [...entries, newEntry];
  
  localStorage.setItem(KEYS.FOOD_ENTRIES, JSON.stringify(updatedEntries));
  return newEntry;
};

export const getFoodEntries = (): FoodEntry[] => {
  try {
    const stored = localStorage.getItem(KEYS.FOOD_ENTRIES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading food entries:', error);
    return [];
  }
};

export const getFoodEntriesForDate = (date: string): FoodEntry[] => {
  const entries = getFoodEntries();
  return entries.filter(entry => entry.date === date);
};

export const deleteFoodEntry = (id: string): void => {
  const entries = getFoodEntries();
  const filtered = entries.filter(entry => entry.id !== id);
  localStorage.setItem(KEYS.FOOD_ENTRIES, JSON.stringify(filtered));
};

// Goals
export const saveGoals = (goals: Goals): void => {
  localStorage.setItem(KEYS.GOALS, JSON.stringify(goals));
};

export const getGoals = (): Goals => {
  try {
    const stored = localStorage.getItem(KEYS.GOALS);
    return stored ? JSON.parse(stored) : {
      calories: 2000,
      protein: 150,
      carbs: 250,
      fat: 67
    };
  } catch (error) {
    console.error('Error loading goals:', error);
    return { calories: 2000, protein: 150, carbs: 250, fat: 67 };
  }
};

// Settings
export const saveSettings = (settings: Settings): void => {
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
};

export const getSettings = (): Settings => {
  try {
    const stored = localStorage.getItem(KEYS.SETTINGS);
    return stored ? JSON.parse(stored) : {
      notifications: true,
      reminderTime: "8:00",
      waterReminders: true,
      darkMode: false,
      units: "metric",
      weekStartsOn: "monday"
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    return {
      notifications: true,
      reminderTime: "8:00",
      waterReminders: true,
      darkMode: false,
      units: "metric",
      weekStartsOn: "monday"
    };
  }
};

// Water Intake
export const saveWaterIntake = (date: string, glasses: number): void => {
  const waterData = getWaterIntake();
  waterData[date] = glasses;
  localStorage.setItem(KEYS.WATER_INTAKE, JSON.stringify(waterData));
};

export const getWaterIntake = (): Record<string, number> => {
  try {
    const stored = localStorage.getItem(KEYS.WATER_INTAKE);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error loading water intake:', error);
    return {};
  }
};

export const getWaterIntakeForDate = (date: string): number => {
  const waterData = getWaterIntake();
  return waterData[date] || 0;
};

// Utility functions
export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getCurrentTime = (): string => {
  return new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

// Export data to CSV
export const exportToCSV = (): string => {
  const entries = getFoodEntries();
  const goals = getGoals();
  
  const csvHeaders = [
    'Date',
    'Time', 
    'Meal',
    'Food Name',
    'Serving',
    'Calories',
    'Protein (g)',
    'Carbs (g)',
    'Fat (g)'
  ].join(',');
  
  const csvRows = entries.map(entry => [
    entry.date,
    entry.time,
    entry.meal,
    `"${entry.name}"`, // Wrap in quotes for CSV safety
    `"${entry.serving}"`,
    entry.calories,
    entry.protein,
    entry.carbs,
    entry.fat
  ].join(','));
  
  const csvContent = [
    csvHeaders,
    ...csvRows,
    '',
    `Current Goals:,,,,,${goals.calories},${goals.protein},${goals.carbs},${goals.fat}`
  ].join('\n');
  
  return csvContent;
};

// Clear all data
export const clearAllData = (): void => {
  Object.values(KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};