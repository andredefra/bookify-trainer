
// Mappa delle immagini per ogni tipo di attrezzatura
export const equipmentImageMap: { [equipment: string]: string } = {
  // Pesi liberi
  'Dumbbells': 'https://images.unsplash.com/photo-1581009146145-b5c53a5604dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Barbell': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Kettlebell': 'https://images.unsplash.com/photo-1581009146145-b5c53a5604dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  
  // Macchine
  'Leg Press Machine': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Chest Press Machine': 'https://images.unsplash.com/photo-1571019614011-15f219b65842?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Lat Pulldown Machine': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Cable Machine': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Smith Machine': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  
  // Panche e rack
  'Bench': 'https://images.unsplash.com/photo-1571019614011-15f219b65842?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Incline Bench': 'https://images.unsplash.com/photo-1571019614011-15f219b65842?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Decline Bench': 'https://images.unsplash.com/photo-1571019614011-15f219b65842?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Power Rack': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  
  // Attrezzatura funzionale
  'Pull-up Bar': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Resistance Band': 'https://images.unsplash.com/photo-1581009146145-b5c53a5604dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Medicine Ball': 'https://images.unsplash.com/photo-1581009146145-b5c53a5604dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Stability Ball': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  
  // Cardio
  'Treadmill': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Stationary Bike': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Rowing Machine': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  
  // Bodyweight
  'Bodyweight': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80',
  'Mat': 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80'
};

// Funzione per ottenere l'immagine di un'attrezzatura
export const getEquipmentImage = (equipment: string): string => {
  return equipmentImageMap[equipment] || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80';
};

// Funzione per generare automaticamente le immagini per gli esercizi
export const generateEquipmentImages = (equipment: string[]): { [equipment: string]: string } => {
  const images: { [equipment: string]: string } = {};
  equipment.forEach(eq => {
    images[eq] = getEquipmentImage(eq);
  });
  return images;
};
