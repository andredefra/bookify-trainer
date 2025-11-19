import { CustomActivityType, ActivityType } from "../types";

const STORAGE_KEY = 'fitness_custom_activity_types';

export const customActivityTypesService = {
  getCustomActivityTypes(): ActivityType[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading custom activity types:', error);
      return [];
    }
  },

  saveCustomActivityType(template: Omit<CustomActivityType, 'id' | 'isCustom'>): ActivityType {
    const customTypes = this.getCustomActivityTypes();
    
    const newTemplate: ActivityType = {
      ...template,
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      isCustom: true
    };
    
    customTypes.push(newTemplate);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customTypes));
    
    return newTemplate;
  },

  updateCustomActivityType(id: string, updates: Partial<ActivityType>): boolean {
    const customTypes = this.getCustomActivityTypes();
    const index = customTypes.findIndex(t => t.id === id);
    
    if (index === -1) return false;
    
    customTypes[index] = { ...customTypes[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customTypes));
    
    return true;
  },

  deleteCustomActivityType(id: string): boolean {
    const customTypes = this.getCustomActivityTypes();
    const filtered = customTypes.filter(t => t.id !== id);
    
    if (filtered.length === customTypes.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  checkDuplicateTitle(title: string, excludeId?: string): boolean {
    const customTypes = this.getCustomActivityTypes();
    return customTypes.some(
      t => t.title.toLowerCase() === title.toLowerCase() && t.id !== excludeId
    );
  }
};
