
import { useState, useEffect } from "react";
import { AdditionalService, ServiceAnalytics } from "../types";
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
const ANALYTICS_STORAGE_KEY = 'trainer-services-analytics';

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

// Mock analytics data
const mockAnalytics: ServiceAnalytics[] = [
  {
    serviceId: "1",
    salesCount: 45,
    totalRevenue: 2250,
    lastSaleDate: new Date('2024-12-01'),
    activeClients: [
      { id: '1', name: 'Marco Rossi', email: 'marco@email.com', phone: '+39 123 456 789', startDate: new Date('2024-11-15'), packageName: 'Premium Training', status: 'active' },
      { id: '2', name: 'Laura Bianchi', email: 'laura@email.com', startDate: new Date('2024-11-20'), packageName: 'Transformation Program', status: 'active' },
      { id: '3', name: 'Andrea Verdi', email: 'andrea@email.com', startDate: new Date('2024-12-01'), packageName: 'Basic Package', status: 'active' }
    ],
    linkedPackages: [
      { id: 'pkg1', name: 'Premium Training', type: 'hybrid', price: 150, clientsCount: 8 },
      { id: 'pkg2', name: 'Transformation Program', type: 'sessions_only', price: 120, clientsCount: 5 }
    ]
  },
  {
    serviceId: "2",
    salesCount: 32,
    totalRevenue: 2560,
    lastSaleDate: new Date('2024-11-28'),
    activeClients: [
      { id: '4', name: 'Giulia Neri', email: 'giulia@email.com', startDate: new Date('2024-11-10'), packageName: 'Nutrition Plus', status: 'active' },
      { id: '5', name: 'Roberto Blu', email: 'roberto@email.com', startDate: new Date('2024-11-25'), packageName: 'Complete Wellness', status: 'active' }
    ],
    linkedPackages: [
      { id: 'pkg3', name: 'Nutrition Plus', type: 'service', price: 90, clientsCount: 12 },
      { id: 'pkg4', name: 'Complete Wellness', type: 'hybrid', price: 200, clientsCount: 6 }
    ]
  },
  {
    serviceId: "3",
    salesCount: 28,
    totalRevenue: 1680,
    lastSaleDate: new Date('2024-12-02'),
    activeClients: [
      { id: '6', name: 'Francesca Rosa', email: 'francesca@email.com', startDate: new Date('2024-11-18'), packageName: 'Starter Package', status: 'active' }
    ],
    linkedPackages: [
      { id: 'pkg5', name: 'Starter Package', type: 'sessions_only', price: 80, clientsCount: 15 }
    ]
  }
];

export function useServices() {
  const [services, setServices] = useState<AdditionalService[]>([]);
  const [analytics, setAnalytics] = useState<ServiceAnalytics[]>(mockAnalytics);

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

  const getServiceAnalytics = (serviceId: string) => {
    return analytics.find(a => a.serviceId === serviceId);
  };

  const getMostSoldService = () => {
    const serviceWithMostSales = analytics.reduce((prev, current) => 
      prev.salesCount > current.salesCount ? prev : current
    );
    const service = services.find(s => s.id === serviceWithMostSales.serviceId);
    return service ? { service, analytics: serviceWithMostSales } : null;
  };

  const getTotalServiceRevenue = () => {
    return analytics.reduce((sum, a) => sum + a.totalRevenue, 0);
  };

  const getTotalActiveClients = () => {
    const uniqueClients = new Set();
    analytics.forEach(a => {
      a.activeClients.forEach(client => uniqueClients.add(client.id));
    });
    return uniqueClients.size;
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
    getActiveServices,
    getServiceAnalytics,
    getMostSoldService,
    getTotalServiceRevenue,
    getTotalActiveClients,
    analytics
  };
}
