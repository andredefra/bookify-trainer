
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { ExpirationItem } from '@/hooks/useExpirationMonitoring';

export interface GymMemberExpiration extends ExpirationItem {
  memberEmail: string;
  packageId: string;
  assignmentId: string;
  renewalEligible: boolean;
  lastRenewalDate?: string;
}

export function useGymMemberExpirations() {
  const [expiringItems, setExpiringItems] = useState<GymMemberExpiration[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const generateMockGymMemberExpirations = (): GymMemberExpiration[] => {
    const today = new Date();
    
    return [
      {
        id: 'gme-1',
        type: 'package',
        title: 'Pacchetto Premium Mensile',
        clientName: 'Marco Rossi',
        memberEmail: 'marco.rossi@email.com',
        packageId: 'pkg-premium-monthly',
        assignmentId: 'assign-1',
        expiryDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        daysLeft: 2,
        status: 'critical',
        renewalEligible: true,
        lastRenewalDate: '2024-06-15',
        details: { 
          sessionsUsed: 12, 
          sessionsTotal: 16 
        }
      },
      {
        id: 'gme-2',
        type: 'package',
        title: 'Pacchetto Basic Settimanale',
        clientName: 'Anna Bianchi',
        memberEmail: 'anna.bianchi@email.com',
        packageId: 'pkg-basic-weekly',
        assignmentId: 'assign-2',
        expiryDate: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        daysLeft: 4,
        status: 'warning',
        renewalEligible: true,
        details: { 
          sessionsUsed: 3, 
          sessionsTotal: 4 
        }
      },
      {
        id: 'gme-3',
        type: 'program',
        title: 'Programma Dimagrimento 3 Mesi',
        clientName: 'Luca Verdi',
        memberEmail: 'luca.verdi@email.com',
        packageId: 'prog-weight-loss',
        assignmentId: 'assign-3',
        expiryDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        daysLeft: 7,
        status: 'warning',
        renewalEligible: false,
        details: { 
          completionPercentage: 85 
        }
      },
      {
        id: 'gme-4',
        type: 'package',
        title: 'Pacchetto Unlimited',
        clientName: 'Sofia Nero',
        memberEmail: 'sofia.nero@email.com',
        packageId: 'pkg-unlimited',
        assignmentId: 'assign-4',
        expiryDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        daysLeft: 1,
        status: 'critical',
        renewalEligible: true,
        lastRenewalDate: '2024-05-20',
        details: { 
          sessionsUsed: 28, 
          sessionsTotal: 30 
        }
      },
      {
        id: 'gme-5',
        type: 'package',
        title: 'Pacchetto Studenti',
        clientName: 'Giuseppe Blu',
        memberEmail: 'giuseppe.blu@email.com',
        packageId: 'pkg-student',
        assignmentId: 'assign-5',
        expiryDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        daysLeft: 10,
        status: 'info',
        renewalEligible: true,
        details: { 
          sessionsUsed: 6, 
          sessionsTotal: 12 
        }
      }
    ];
  };

  const fetchExpiringMembers = async () => {
    try {
      setLoading(true);
      // In una implementazione reale, questo farebbe una chiamata al database
      // per ottenere le scadenze dei pacchetti/programmi dei membri della palestra
      const mockData = generateMockGymMemberExpirations();
      setExpiringItems(mockData);
    } catch (error) {
      console.error('Error fetching gym member expirations:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare le scadenze dei membri",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getExpirationsByStatus = (status: ExpirationItem['status']) => {
    return expiringItems.filter(item => item.status === status);
  };

  const getExpirationsByType = (type: ExpirationItem['type']) => {
    return expiringItems.filter(item => item.type === type);
  };

  const getRenewableExpirations = () => {
    return expiringItems.filter(item => item.renewalEligible);
  };

  const getCriticalExpirations = () => {
    return expiringItems.filter(item => item.status === 'critical');
  };

  const getExpirationCount = () => {
    return {
      total: expiringItems.length,
      critical: expiringItems.filter(item => item.status === 'critical').length,
      warning: expiringItems.filter(item => item.status === 'warning').length,
      info: expiringItems.filter(item => item.status === 'info').length,
      renewable: expiringItems.filter(item => item.renewalEligible).length
    };
  };

  const sendRenewalReminder = async (memberExpiration: GymMemberExpiration) => {
    try {
      // In una implementazione reale, questo invierebbe un promemoria di rinnovo
      console.log(`Sending renewal reminder to ${memberExpiration.memberEmail}`);
      
      toast({
        title: "Promemoria Inviato",
        description: `Promemoria di rinnovo inviato a ${memberExpiration.clientName}`,
      });
    } catch (error) {
      console.error('Error sending renewal reminder:', error);
      toast({
        title: "Errore",
        description: "Impossibile inviare il promemoria",
        variant: "destructive",
      });
    }
  };

  const createRenewalOffer = async (memberExpiration: GymMemberExpiration, discountPercentage: number = 10) => {
    try {
      // In una implementazione reale, questo creerebbe un'offerta di rinnovo
      console.log(`Creating renewal offer for ${memberExpiration.memberEmail} with ${discountPercentage}% discount`);
      
      toast({
        title: "Offerta Creata",
        description: `Offerta di rinnovo del ${discountPercentage}% creata per ${memberExpiration.clientName}`,
      });
    } catch (error) {
      console.error('Error creating renewal offer:', error);
      toast({
        title: "Errore",
        description: "Impossibile creare l'offerta di rinnovo",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchExpiringMembers();
  }, []);

  return {
    expiringItems,
    loading,
    getExpirationsByStatus,
    getExpirationsByType,
    getRenewableExpirations,
    getCriticalExpirations,
    getExpirationCount,
    sendRenewalReminder,
    createRenewalOffer,
    refetch: fetchExpiringMembers
  };
}
