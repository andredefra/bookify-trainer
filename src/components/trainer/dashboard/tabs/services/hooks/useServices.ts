
import { useState, useEffect } from "react";
import { AdditionalService } from "../types";
import { 
  MessageCircle, 
  FileText, 
  Phone, 
  Calendar, 
  Utensils, 
  Heart,
  Dumbbell,
  Clock,
  Users,
  Target,
  Activity,
  Zap
} from "lucide-react";

const iconMap = {
  MessageCircle,
  FileText,
  Phone,
  Calendar,
  Utensils,
  Heart,
  Dumbbell,
  Clock,
  Users,
  Target,
  Activity,
  Zap
};

const STORAGE_KEY = 'trainer-services';

const defaultServices: AdditionalService[] = [
  {
    id: "1",
    name: "Supporto WhatsApp 24/7",
    description: "Supporto costante via WhatsApp per domande e motivazione",
    price: 50,
    icon: "MessageCircle",
    category: "support",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    name: "Piano Nutrizionale Personalizzato",
    description: "Piano alimentare su misura con ricette e lista spesa",
    price: 80,
    icon: "Utensils",
    category: "nutrition",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    name: "Consulenza Iniziale Approfondita",
    description: "Sessione di 90 minuti per valutazione completa e obiettivi",
    price: 60,
    icon: "FileText",
    category: "consultation",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export function useServices() {
  const [services, setServices] = useState<AdditionalService[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedServices = JSON.parse(stored).map((service: any) => ({
          ...service,
          createdAt: new Date(service.createdAt),
          updatedAt: new Date(service.updatedAt),
          icon: iconMap[service.icon as keyof typeof iconMap] ? service.icon : 'MessageCircle'
        }));
        setServices(parsedServices);
      } catch (error) {
        console.error('Error loading services:', error);
        setServices(defaultServices);
      }
    } else {
      setServices(defaultServices);
    }
  }, []);

  const saveServices = (newServices: AdditionalService[]) => {
    setServices(newServices);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newServices));
  };

  const createService = (serviceData: Omit<AdditionalService, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newService: AdditionalService = {
      ...serviceData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const newServices = [...services, newService];
    saveServices(newServices);
  };

  const updateService = (id: string, serviceData: Omit<AdditionalService, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newServices = services.map(service => 
      service.id === id 
        ? { ...service, ...serviceData, updatedAt: new Date() }
        : service
    );
    saveServices(newServices);
  };

  const deleteService = (id: string) => {
    const newServices = services.filter(service => service.id !== id);
    saveServices(newServices);
  };

  const duplicateService = (id: string) => {
    const serviceToDuplicate = services.find(service => service.id === id);
    if (serviceToDuplicate) {
      const duplicatedService: AdditionalService = {
        ...serviceToDuplicate,
        id: Date.now().toString(),
        name: `${serviceToDuplicate.name} (Copy)`,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const newServices = [...services, duplicatedService];
      saveServices(newServices);
    }
  };

  const toggleServiceStatus = (id: string) => {
    const newServices = services.map(service => 
      service.id === id 
        ? { ...service, isActive: !service.isActive, updatedAt: new Date() }
        : service
    );
    saveServices(newServices);
  };

  const getActiveServices = () => {
    return services.filter(service => service.isActive).map(service => ({
      id: service.id,
      name: service.name,
      price: service.price,
      description: service.description,
      icon: iconMap[service.icon as keyof typeof iconMap] || MessageCircle
    }));
  };

  return {
    services: services.map(service => ({
      ...service,
      icon: iconMap[service.icon as keyof typeof iconMap] || MessageCircle
    })),
    createService,
    updateService,
    deleteService,
    duplicateService,
    toggleServiceStatus,
    getActiveServices
  };
}
