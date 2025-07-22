
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ExpirationItem {
  id: string;
  type: 'package' | 'program' | 'session';
  title: string;
  clientName: string;
  expiryDate: string;
  daysLeft: number;
  status: 'critical' | 'warning' | 'info';
  details?: {
    sessionsUsed?: number;
    sessionsTotal?: number;
    completionPercentage?: number;
  };
}

export function useExpirationMonitoring() {
  const [expiringItems, setExpiringItems] = useState<ExpirationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const generateMockExpirations = (): ExpirationItem[] => {
    const today = new Date();
    
    return [
      {
        id: '1',
        type: 'package',
        title: 'Premium Training Package',
        clientName: 'Marco Rossi',
        expiryDate: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        daysLeft: 3,
        status: 'critical',
        details: { sessionsUsed: 8, sessionsTotal: 10 }
      },
      {
        id: '2',
        type: 'program',
        title: 'Weight Loss Program',
        clientName: 'Anna Bianchi',
        expiryDate: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        daysLeft: 5,
        status: 'warning',
        details: { completionPercentage: 80 }
      },
      {
        id: '3',
        type: 'package',
        title: 'Basic Fitness Package',
        clientName: 'Luca Verdi',
        expiryDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        daysLeft: 10,
        status: 'info',
        details: { sessionsUsed: 3, sessionsTotal: 8 }
      },
      {
        id: '4',
        type: 'program',
        title: 'Strength Building Program',
        clientName: 'Sofia Nero',
        expiryDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        daysLeft: 2,
        status: 'critical',
        details: { completionPercentage: 95 }
      }
    ];
  };

  const fetchExpiringItems = async () => {
    try {
      // In a real implementation, this would fetch from the database
      const mockData = generateMockExpirations();
      setExpiringItems(mockData);
    } catch (error) {
      console.error('Error fetching expiring items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getExpirationsByType = (type: ExpirationItem['type']) => {
    return expiringItems.filter(item => item.type === type);
  };

  const getCriticalExpirations = () => {
    return expiringItems.filter(item => item.status === 'critical');
  };

  const getExpirationCount = () => {
    return {
      total: expiringItems.length,
      critical: expiringItems.filter(item => item.status === 'critical').length,
      warning: expiringItems.filter(item => item.status === 'warning').length,
      info: expiringItems.filter(item => item.status === 'info').length
    };
  };

  useEffect(() => {
    fetchExpiringItems();
  }, []);

  return {
    expiringItems,
    loading,
    getExpirationsByType,
    getCriticalExpirations,
    getExpirationCount,
    refetch: fetchExpiringItems
  };
}
