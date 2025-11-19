
import { GoalTemplate } from "../types";

const STORAGE_KEY = 'fitness_custom_goal_types';

export interface CustomGoalTemplate extends Omit<GoalTemplate, 'type'> {
  id: string;
  type: string;
  title: string;
  guide: string;
  examplePlaceholder: string;
  customUnit?: string;
  isCustom: true;
}

export const customGoalTypesService = {
  getCustomGoalTypes(): CustomGoalTemplate[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading custom goal types:', error);
      return [];
    }
  },

  saveCustomGoalType(template: Omit<CustomGoalTemplate, 'id' | 'isCustom'>): CustomGoalTemplate {
    const customTypes = this.getCustomGoalTypes();
    
    const newTemplate: CustomGoalTemplate = {
      ...template,
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      isCustom: true
    };
    
    customTypes.push(newTemplate);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customTypes));
    
    return newTemplate;
  },

  updateCustomGoalType(id: string, updates: Partial<CustomGoalTemplate>): boolean {
    const customTypes = this.getCustomGoalTypes();
    const index = customTypes.findIndex(t => t.id === id);
    
    if (index === -1) return false;
    
    customTypes[index] = { ...customTypes[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customTypes));
    
    return true;
  },

  deleteCustomGoalType(id: string): boolean {
    const customTypes = this.getCustomGoalTypes();
    const filtered = customTypes.filter(t => t.id !== id);
    
    if (filtered.length === customTypes.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  checkDuplicateTitle(title: string, excludeId?: string): boolean {
    const customTypes = this.getCustomGoalTypes();
    return customTypes.some(
      t => t.title.toLowerCase() === title.toLowerCase() && t.id !== excludeId
    );
  }
};
