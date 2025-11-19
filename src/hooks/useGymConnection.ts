import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface GymConnection {
  id: string;
  client_id: string;
  gym_id: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
  responded_at?: string;
  client_message?: string;
  gym_response?: string;
  created_at: string;
  updated_at: string;
  gym_name?: string;
  gym_address?: string;
  gym_phone?: string;
}

export interface GymPackageAssignment {
  id: string;
  gym_id: string;
  package_id: string;
  title: string;
  description: string;
  package_type: string;
  duration_days?: number;
  session_limit?: number | null;
  price: number;
  sessions_used: number;
  sessions_total: number | null;
  start_date: string;
  end_date: string | null;
  status: string;
  payment_status: string;
}

// Utility function to calculate package remaining units
export function calculatePackageRemaining(pkg: GymPackageAssignment) {
  const now = new Date();
  const endDate = pkg.end_date ? new Date(pkg.end_date) : null;
  const startDate = new Date(pkg.start_date);
  
  if (!endDate) {
    return { daysLeft: Infinity, displayText: 'No expiry', progressPercentage: 0 };
  }
  
  const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  
  // For session-based packages
  if (pkg.package_type === 'sessions' && pkg.sessions_total) {
    const sessionsRemaining = pkg.sessions_total - pkg.sessions_used;
    const progressPercentage = (pkg.sessions_used / pkg.sessions_total) * 100;
    return {
      daysLeft,
      sessionsRemaining,
      progressPercentage,
      displayText: `${pkg.sessions_used}/${pkg.sessions_total} sessions used`,
      remainingText: `${sessionsRemaining} sessions left`
    };
  }
  
  // For duration-based packages (monthly, annual, weekly)
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const elapsedDays = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const progressPercentage = Math.min(100, (elapsedDays / totalDays) * 100);
  
  // Calculate months remaining for monthly/annual packages
  const monthsRemaining = Math.ceil(daysLeft / 30);
  
  return {
    daysLeft,
    monthsRemaining,
    progressPercentage,
    displayText: pkg.package_type === 'annual' || pkg.package_type === 'monthly' 
      ? `${monthsRemaining} month${monthsRemaining !== 1 ? 's' : ''} remaining`
      : `${daysLeft} days remaining`,
    remainingText: `${daysLeft} days left`
  };
}

export interface GymCommunication {
  id: string;
  subject: string;
  message: string;
  sender_type: 'gym' | 'client';
  message_type: string;
  is_read: boolean;
  sent_at: string;
}

export function useGymConnection() {
  const [connection, setConnection] = useState<GymConnection | null>(null);
  const [packages, setPackages] = useState<GymPackageAssignment[]>([]);
  const [communications, setCommunications] = useState<GymCommunication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log('useGymConnection: Starting to fetch gym connection');
    fetchGymConnection();
  }, []);

  const loadDemoData = () => {
    console.log('Loading demo data for gym connection');
    
    // Demo connection data
    const demoConnection: GymConnection = {
      id: 'demo-connection-id',
      client_id: 'demo-client-id',
      gym_id: '11111111-1111-1111-1111-111111111111',
      status: 'approved',
      requested_at: '2025-01-01T10:00:00Z',
      responded_at: '2025-01-01T14:00:00Z',
      client_message: 'Demo connection request',
      gym_response: 'Welcome to FitLife Gym!',
      created_at: '2025-01-01T10:00:00Z',
      updated_at: '2025-01-01T14:00:00Z',
      gym_name: 'FitLife Gym',
      gym_address: 'Via Demo 123, Milano',
      gym_phone: '+39 02 1234567'
    };

    // Demo packages data
    const demoPackages: GymPackageAssignment[] = [
      {
        id: 'demo-package-1',
        gym_id: '11111111-1111-1111-1111-111111111111',
        package_id: 'demo-pkg-1',
        title: 'Premium Monthly',
        description: 'Full access to all facilities and unlimited group classes',
        package_type: 'monthly',
        duration_days: 30,
        session_limit: null,
        price: 99.99,
        start_date: '2025-11-01',
        end_date: '2026-11-01', // 12 months in the future
        sessions_used: 0,
        sessions_total: null,
        status: 'active',
        payment_status: 'paid'
      },
      {
        id: 'demo-package-2',
        gym_id: '11111111-1111-1111-1111-111111111111',
        package_id: 'demo-pkg-2',
        title: 'Personal Training 10 Sessions',
        description: '10 one-on-one personal training sessions with expert trainers',
        package_type: 'sessions',
        duration_days: 90,
        session_limit: 10,
        price: 750.00,
        start_date: '2025-10-01',
        end_date: '2026-01-01', // 3 months in the future
        sessions_used: 3,
        sessions_total: 10,
        status: 'active',
        payment_status: 'paid'
      }
    ];

    // Demo communications data
    const demoCommunications: GymCommunication[] = [
      {
        id: 'demo-comm-1',
        subject: 'Welcome to FitLife Gym!',
        message: 'Welcome to our gym family! Your Premium Monthly package is now active. You can start booking sessions right away.',
        sender_type: 'gym',
        message_type: 'welcome',
        is_read: true,
        sent_at: '2025-01-01T15:00:00Z'
      },
      {
        id: 'demo-comm-2',
        subject: 'Your next training session',
        message: 'Reminder: Your personal training session is scheduled for tomorrow at 3 PM with trainer Mike. Please bring water and a towel.',
        sender_type: 'gym',
        message_type: 'session_update',
        is_read: false,
        sent_at: '2025-01-14T18:00:00Z'
      },
      {
        id: 'demo-comm-3',
        subject: 'New Group Classes Available',
        message: 'We have added new yoga and pilates classes to our schedule. Check them out in the app!',
        sender_type: 'gym',
        message_type: 'general',
        is_read: false,
        sent_at: '2025-01-13T09:00:00Z'
      }
    ];

    setConnection(demoConnection);
    setPackages(demoPackages);
    setCommunications(demoCommunications);
    setError(null);
  };

  const fetchGymConnection = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log('No user found - loading demo data');
        loadDemoData();
        setLoading(false);
        return;
      }

      // Check for approved gym connection
      const { data: connectionData, error: connectionError } = await supabase
        .from('gym_connection_requests')
        .select('*')
        .eq('client_id', user.id)
        .eq('status', 'approved')
        .maybeSingle();

      if (connectionError && connectionError.code !== 'PGRST116') {
        console.error('Connection error, falling back to demo data:', connectionError);
        loadDemoData();
        setLoading(false);
        return;
      }

      if (connectionData) {
        setConnection({
          id: connectionData.id,
          client_id: connectionData.client_id,
          gym_id: connectionData.gym_id,
          status: connectionData.status as 'pending' | 'approved' | 'rejected',
          requested_at: connectionData.requested_at,
          responded_at: connectionData.responded_at,
          client_message: connectionData.client_message,
          gym_response: connectionData.gym_response,
          created_at: connectionData.created_at,
          updated_at: connectionData.updated_at,
          gym_name: 'FitLife Gym'
        });

        // Fetch gym packages
        await fetchGymPackages(connectionData.gym_id, user.id);
        
        // Fetch communications
        await fetchCommunications(connectionData.gym_id, user.id);
      } else {
        console.log('No approved connection found - loading demo data');
        loadDemoData();
      }
    } catch (err) {
      console.error('Error fetching gym connection, falling back to demo data:', err);
      loadDemoData();
    } finally {
      setLoading(false);
    }
  };

  const fetchGymPackages = async (gymId: string, clientId: string) => {
    try {
      const { data, error } = await supabase
        .from('gym_package_assignments')
        .select(`
          *,
          gym_packages(title, description, package_type, duration_days, session_limit)
        `)
        .eq('gym_id', gymId)
        .eq('client_id', clientId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedPackages = data?.map(pkg => ({
        id: pkg.id,
        gym_id: pkg.gym_id,
        package_id: pkg.package_id,
        title: pkg.gym_packages?.title || 'Pacchetto',
        description: pkg.gym_packages?.description || '',
        package_type: pkg.gym_packages?.package_type || 'monthly',
        duration_days: pkg.gym_packages?.duration_days || 30,
        session_limit: pkg.gym_packages?.session_limit || null,
        price: pkg.total_paid || 0,
        sessions_used: pkg.sessions_used || 0,
        sessions_total: pkg.sessions_total || pkg.gym_packages?.session_limit || null,
        start_date: pkg.start_date,
        end_date: pkg.end_date || null,
        status: pkg.status,
        payment_status: pkg.payment_status || 'paid'
      })) || [];

      setPackages(mappedPackages);
    } catch (err) {
      console.error('Error fetching gym packages:', err);
    }
  };

  const fetchCommunications = async (gymId: string, clientId: string) => {
    try {
      const { data, error } = await supabase
        .from('gym_client_communications')
        .select('*')
        .eq('gym_id', gymId)
        .eq('client_id', clientId)
        .order('sent_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const mappedCommunications = data?.map(comm => ({
        id: comm.id,
        subject: comm.subject,
        message: comm.message,
        sender_type: comm.sender_type as 'gym' | 'client',
        message_type: comm.message_type,
        is_read: comm.is_read,
        sent_at: comm.sent_at
      })) || [];

      setCommunications(mappedCommunications);
    } catch (err) {
      console.error('Error fetching communications:', err);
    }
  };

  const sendConnectionRequest = async (gymId: string, message?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Utente non autenticato');

      const { error } = await supabase
        .from('gym_connection_requests')
        .insert({
          client_id: user.id,
          gym_id: gymId,
          client_message: message,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Richiesta inviata",
        description: "La tua richiesta di connessione è stata inviata alla palestra.",
      });

      fetchGymConnection();
    } catch (err) {
      console.error('Error sending connection request:', err);
      toast({
        title: "Errore",
        description: err instanceof Error ? err.message : "Errore durante l'invio della richiesta",
        variant: "destructive",
      });
    }
  };

  const markCommunicationAsRead = async (communicationId: string) => {
    try {
      const { error } = await supabase
        .from('gym_client_communications')
        .update({ 
          is_read: true, 
          read_at: new Date().toISOString() 
        })
        .eq('id', communicationId);

      if (error) throw error;

      setCommunications(prev => 
        prev.map(comm => 
          comm.id === communicationId 
            ? { ...comm, is_read: true }
            : comm
        )
      );
    } catch (err) {
      console.error('Error marking communication as read:', err);
    }
  };

  return {
    connection,
    packages,
    communications,
    loading,
    error,
    isConnected: !!connection,
    sendConnectionRequest,
    markCommunicationAsRead,
    refetch: fetchGymConnection,
  };
}