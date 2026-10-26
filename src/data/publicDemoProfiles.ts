import indiaMarketplaceData from './indiaMarketplaceData.json';
import { demoTrainers, getTrainerById, type Trainer } from './trainerMockData';

// Adapt only facts present in the India dataset; never borrow Italian credentials or history.
const specialtyLabels: Record<string, string> = {
  strength: 'Strength', 'weight-loss': 'Weight loss', 'group-bootcamp': 'Group bootcamp',
  'pre-post-natal': 'Pre & post-natal', posture: 'Posture & mobility', running: 'Running', online: 'Online coaching',
};
export const indiaDemoProfiles: Trainer[] = indiaMarketplaceData.map(record => ({
  id: record.id, slug: record.id, name: record.name, title: record.title,
  location: record.location, rating: record.rating, reviews: record.reviews,
  hourlyRate: record.hourlyRate, currency: 'INR', credentials: record.credentials,
  specialties: record.specialties.map(tag => specialtyLabels[tag] ?? tag),
  profileImage: record.image, bio: '', certifications: [], education: '', experience: [],
  availability: {}, status: 'online', nextAvailability: record.availableLabel,
}));

export function getPublicDemoProfile(id: string): Trainer | undefined {
  return indiaDemoProfiles.find(record => record.id === id || record.slug === id) ?? getTrainerById(id);
}

export function getPublicDemoRecord(id: string) {
  return demoTrainers.find(record => record.id === id || record.id === `t${id}` || record.slug === id);
}