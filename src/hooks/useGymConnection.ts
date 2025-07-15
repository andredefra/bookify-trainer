import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface GymConnection {
  id: string;
  gym_id: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
  responded_at?: string;
  gym_response?: string;
  gym_name?: string;
  gym_address?: string;
  gym_phone?: string;
}

export interface GymPackageAssignment {
  id: string;
  package_id: string;
  title: string;
  description: string;
  sessions_used: number;
  sessions_total: number;
  start_date: string;
  end_date: string;
  status: string;
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
    fetchGymConnection();
  }, []);

  const fetchGymConnection = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
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
        throw connectionError;
      }

      if (connectionData) {
        setConnection({
          id: connectionData.id,
          gym_id: connectionData.gym_id,
          status: connectionData.status as 'pending' | 'approved' | 'rejected',
          requested_at: connectionData.requested_at,
          responded_at: connectionData.responded_at,
          gym_response: connectionData.gym_response,
          gym_name: 'Palestra'
        });

        // Fetch gym packages
        await fetchGymPackages(connectionData.gym_id, user.id);
        
        // Fetch communications
        await fetchCommunications(connectionData.gym_id, user.id);
      } else {
        setConnection(null);
        setPackages([]);
        setCommunications([]);
      }
    } catch (err) {
      console.error('Error fetching gym connection:', err);
      setError(err instanceof Error ? err.message : 'Errore durante il caricamento');
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
          gym_packages(title, description)
        `)
        .eq('gym_id', gymId)
        .eq('client_id', clientId)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedPackages = data?.map(pkg => ({
        id: pkg.id,
        package_id: pkg.package_id,
        title: pkg.gym_packages?.title || 'Pacchetto',
        description: pkg.gym_packages?.description || '',
        sessions_used: pkg.sessions_used || 0,
        sessions_total: pkg.sessions_total || 0,
        start_date: pkg.start_date,
        end_date: pkg.end_date || '',
        status: pkg.status
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