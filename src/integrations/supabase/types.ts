export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      automated_messages: {
        Row: {
          content: string
          created_at: string
          error_message: string | null
          id: string
          recipient_email: string
          recipient_id: string
          recipient_name: string
          rule_id: string
          sent_at: string | null
          status: string | null
          subject: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          error_message?: string | null
          id?: string
          recipient_email: string
          recipient_id: string
          recipient_name: string
          rule_id: string
          sent_at?: string | null
          status?: string | null
          subject: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          error_message?: string | null
          id?: string
          recipient_email?: string
          recipient_id?: string
          recipient_name?: string
          rule_id?: string
          sent_at?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "automated_messages_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "message_automation_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_rules: {
        Row: {
          created_at: string | null
          days_before_expiry: number | null
          discount_percentage: number | null
          discount_valid_days: number | null
          gym_id: string
          id: string
          is_active: boolean | null
          template_id: string
          trigger_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          days_before_expiry?: number | null
          discount_percentage?: number | null
          discount_valid_days?: number | null
          gym_id: string
          id?: string
          is_active?: boolean | null
          template_id: string
          trigger_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          days_before_expiry?: number | null
          discount_percentage?: number | null
          discount_valid_days?: number | null
          gym_id?: string
          id?: string
          is_active?: boolean | null
          template_id?: string
          trigger_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_rules_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      calendar_events: {
        Row: {
          client_id: string | null
          color: string | null
          created_at: string
          description: string | null
          end_datetime: string
          event_category: Database["public"]["Enums"]["event_category"]
          id: string
          is_recurring: boolean | null
          lead_id: string | null
          location: string | null
          package_assignment_id: string | null
          recurrence_pattern: string | null
          session_id: string | null
          start_datetime: string
          title: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          color?: string | null
          created_at?: string
          description?: string | null
          end_datetime: string
          event_category: Database["public"]["Enums"]["event_category"]
          id?: string
          is_recurring?: boolean | null
          lead_id?: string | null
          location?: string | null
          package_assignment_id?: string | null
          recurrence_pattern?: string | null
          session_id?: string | null
          start_datetime: string
          title: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          color?: string | null
          created_at?: string
          description?: string | null
          end_datetime?: string
          event_category?: Database["public"]["Enums"]["event_category"]
          id?: string
          is_recurring?: boolean | null
          lead_id?: string | null
          location?: string | null
          package_assignment_id?: string | null
          recurrence_pattern?: string | null
          session_id?: string | null
          start_datetime?: string
          title?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      client_invitations: {
        Row: {
          client_email: string
          client_name: string
          created_at: string
          expires_at: string
          id: string
          lead_id: string | null
          message: string | null
          responded_at: string | null
          response_message: string | null
          status: Database["public"]["Enums"]["invitation_status"]
          trainer_id: string
          updated_at: string
        }
        Insert: {
          client_email: string
          client_name: string
          created_at?: string
          expires_at?: string
          id?: string
          lead_id?: string | null
          message?: string | null
          responded_at?: string | null
          response_message?: string | null
          status?: Database["public"]["Enums"]["invitation_status"]
          trainer_id: string
          updated_at?: string
        }
        Update: {
          client_email?: string
          client_name?: string
          created_at?: string
          expires_at?: string
          id?: string
          lead_id?: string | null
          message?: string | null
          responded_at?: string | null
          response_message?: string | null
          status?: Database["public"]["Enums"]["invitation_status"]
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      client_package_assignments: {
        Row: {
          client_id: string
          created_at: string | null
          expiry_date: string | null
          id: string
          package_id: string
          purchase_date: string | null
          sessions_total: number
          sessions_used: number | null
          status: string | null
          total_paid: number | null
          trainer_id: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          package_id: string
          purchase_date?: string | null
          sessions_total: number
          sessions_used?: number | null
          status?: string | null
          total_paid?: number | null
          trainer_id: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          package_id?: string
          purchase_date?: string | null
          sessions_total?: number
          sessions_used?: number | null
          status?: string | null
          total_paid?: number | null
          trainer_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_package_assignments_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "client_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      client_package_payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          notes: string | null
          package_assignment_id: string
          payment_date: string | null
          payment_method: string | null
          payment_status: string | null
          stripe_payment_intent_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          notes?: string | null
          package_assignment_id: string
          payment_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          package_assignment_id?: string
          payment_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          stripe_payment_intent_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_package_payments_package_assignment_id_fkey"
            columns: ["package_assignment_id"]
            isOneToOne: false
            referencedRelation: "client_package_assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      client_packages: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          package_type: string
          price: number
          sessions_count: number | null
          title: string
          trainer_id: string
          updated_at: string | null
          validity_days: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          package_type: string
          price: number
          sessions_count?: number | null
          title: string
          trainer_id: string
          updated_at?: string | null
          validity_days?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          package_type?: string
          price?: number
          sessions_count?: number | null
          title?: string
          trainer_id?: string
          updated_at?: string | null
          validity_days?: number | null
        }
        Relationships: []
      }
      email_campaigns: {
        Row: {
          assignment_id: string
          bounce_reason: string | null
          clicked_at: string | null
          content: string
          created_at: string | null
          gym_id: string
          id: string
          opened_at: string | null
          recipient_email: string
          recipient_name: string | null
          rule_id: string | null
          sent_at: string | null
          status: string | null
          subject: string
          template_id: string
          updated_at: string | null
        }
        Insert: {
          assignment_id: string
          bounce_reason?: string | null
          clicked_at?: string | null
          content: string
          created_at?: string | null
          gym_id: string
          id?: string
          opened_at?: string | null
          recipient_email: string
          recipient_name?: string | null
          rule_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
          template_id: string
          updated_at?: string | null
        }
        Update: {
          assignment_id?: string
          bounce_reason?: string | null
          clicked_at?: string | null
          content?: string
          created_at?: string | null
          gym_id?: string
          id?: string
          opened_at?: string | null
          recipient_email?: string
          recipient_name?: string | null
          rule_id?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
          template_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "gym_package_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaigns_rule_id_fkey"
            columns: ["rule_id"]
            isOneToOne: false
            referencedRelation: "automation_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          content: string
          created_at: string | null
          gym_id: string
          id: string
          is_active: boolean | null
          name: string
          subject: string
          template_type: string
          updated_at: string | null
          variables: Json | null
        }
        Insert: {
          content: string
          created_at?: string | null
          gym_id: string
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          template_type: string
          updated_at?: string | null
          variables?: Json | null
        }
        Update: {
          content?: string
          created_at?: string | null
          gym_id?: string
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          template_type?: string
          updated_at?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      gym_client_communications: {
        Row: {
          client_id: string
          created_at: string
          gym_id: string
          id: string
          is_read: boolean
          message: string
          message_type: string
          read_at: string | null
          sender_type: string
          sent_at: string
          subject: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          gym_id: string
          id?: string
          is_read?: boolean
          message: string
          message_type?: string
          read_at?: string | null
          sender_type: string
          sent_at?: string
          subject: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          gym_id?: string
          id?: string
          is_read?: boolean
          message?: string
          message_type?: string
          read_at?: string | null
          sender_type?: string
          sent_at?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      gym_clients: {
        Row: {
          client_id: string
          created_at: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          gym_id: string
          id: string
          join_date: string
          last_activity_date: string | null
          membership_type: string
          notes: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          gym_id: string
          id?: string
          join_date?: string
          last_activity_date?: string | null
          membership_type?: string
          notes?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          gym_id?: string
          id?: string
          join_date?: string
          last_activity_date?: string | null
          membership_type?: string
          notes?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gym_clients_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_connection_requests: {
        Row: {
          client_id: string
          client_message: string | null
          created_at: string
          gym_id: string
          gym_response: string | null
          id: string
          requested_at: string
          responded_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          client_id: string
          client_message?: string | null
          created_at?: string
          gym_id: string
          gym_response?: string | null
          id?: string
          requested_at?: string
          responded_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          client_message?: string | null
          created_at?: string
          gym_id?: string
          gym_response?: string | null
          id?: string
          requested_at?: string
          responded_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      gym_group_sessions: {
        Row: {
          created_at: string
          description: string | null
          difficulty_level: string
          duration_minutes: number
          equipment_needed: string | null
          gym_id: string
          id: string
          is_recurring: boolean
          location: string | null
          max_participants: number
          recurrence_pattern: string | null
          requirements: string | null
          session_type: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty_level?: string
          duration_minutes?: number
          equipment_needed?: string | null
          gym_id: string
          id?: string
          is_recurring?: boolean
          location?: string | null
          max_participants?: number
          recurrence_pattern?: string | null
          requirements?: string | null
          session_type?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty_level?: string
          duration_minutes?: number
          equipment_needed?: string | null
          gym_id?: string
          id?: string
          is_recurring?: boolean
          location?: string | null
          max_participants?: number
          recurrence_pattern?: string | null
          requirements?: string | null
          session_type?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      gym_notifications: {
        Row: {
          created_at: string
          gym_id: string
          id: string
          message: string
          read: boolean
          recipient_id: string
          recipient_type: string
          related_assignment_id: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          gym_id: string
          id?: string
          message: string
          read?: boolean
          recipient_id: string
          recipient_type?: string
          related_assignment_id?: string | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          gym_id?: string
          id?: string
          message?: string
          read?: boolean
          recipient_id?: string
          recipient_type?: string
          related_assignment_id?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gym_notifications_related_assignment_id_fkey"
            columns: ["related_assignment_id"]
            isOneToOne: false
            referencedRelation: "gym_trainer_assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_package_assignments: {
        Row: {
          client_id: string
          created_at: string
          end_date: string | null
          gym_id: string
          id: string
          package_id: string
          payment_status: string | null
          purchase_date: string
          receipt_number: string | null
          receipt_sent_at: string | null
          receipt_url: string | null
          sessions_total: number | null
          sessions_used: number | null
          start_date: string
          status: string | null
          total_paid: number
          trainer_id: string | null
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          end_date?: string | null
          gym_id: string
          id?: string
          package_id: string
          payment_status?: string | null
          purchase_date?: string
          receipt_number?: string | null
          receipt_sent_at?: string | null
          receipt_url?: string | null
          sessions_total?: number | null
          sessions_used?: number | null
          start_date?: string
          status?: string | null
          total_paid: number
          trainer_id?: string | null
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          end_date?: string | null
          gym_id?: string
          id?: string
          package_id?: string
          payment_status?: string | null
          purchase_date?: string
          receipt_number?: string | null
          receipt_sent_at?: string | null
          receipt_url?: string | null
          sessions_total?: number | null
          sessions_used?: number | null
          start_date?: string
          status?: string | null
          total_paid?: number
          trainer_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gym_package_assignments_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "gym_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_packages: {
        Row: {
          created_at: string
          description: string | null
          duration_days: number | null
          gym_id: string
          id: string
          is_active: boolean | null
          package_type: string
          price: number
          session_limit: number | null
          title: string
          trainer_commission_percentage: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_days?: number | null
          gym_id: string
          id?: string
          is_active?: boolean | null
          package_type?: string
          price: number
          session_limit?: number | null
          title: string
          trainer_commission_percentage?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_days?: number | null
          gym_id?: string
          id?: string
          is_active?: boolean | null
          package_type?: string
          price?: number
          session_limit?: number | null
          title?: string
          trainer_commission_percentage?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      gym_session_bookings: {
        Row: {
          booked_at: string
          booking_status: string
          created_at: string
          id: string
          notes: string | null
          participant_id: string
          session_schedule_id: string
          updated_at: string
          waitlist_position: number | null
        }
        Insert: {
          booked_at?: string
          booking_status?: string
          created_at?: string
          id?: string
          notes?: string | null
          participant_id: string
          session_schedule_id: string
          updated_at?: string
          waitlist_position?: number | null
        }
        Update: {
          booked_at?: string
          booking_status?: string
          created_at?: string
          id?: string
          notes?: string | null
          participant_id?: string
          session_schedule_id?: string
          updated_at?: string
          waitlist_position?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_session_schedule"
            columns: ["session_schedule_id"]
            isOneToOne: false
            referencedRelation: "gym_session_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_session_cancellation_notifications: {
        Row: {
          created_at: string | null
          email_sent: boolean | null
          id: string
          notification_sent_at: string | null
          notification_type: string
          participant_id: string
          session_schedule_id: string
        }
        Insert: {
          created_at?: string | null
          email_sent?: boolean | null
          id?: string
          notification_sent_at?: string | null
          notification_type?: string
          participant_id: string
          session_schedule_id: string
        }
        Update: {
          created_at?: string | null
          email_sent?: boolean | null
          id?: string
          notification_sent_at?: string | null
          notification_type?: string
          participant_id?: string
          session_schedule_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gym_session_cancellation_notifications_session_schedule_id_fkey"
            columns: ["session_schedule_id"]
            isOneToOne: false
            referencedRelation: "gym_session_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_session_participants: {
        Row: {
          attendance_status: string
          created_at: string
          id: string
          notes: string | null
          package_assignment_id: string | null
          participant_id: string
          payment_status: string
          registered_at: string
          session_schedule_id: string
          updated_at: string
        }
        Insert: {
          attendance_status?: string
          created_at?: string
          id?: string
          notes?: string | null
          package_assignment_id?: string | null
          participant_id: string
          payment_status?: string
          registered_at?: string
          session_schedule_id: string
          updated_at?: string
        }
        Update: {
          attendance_status?: string
          created_at?: string
          id?: string
          notes?: string | null
          package_assignment_id?: string | null
          participant_id?: string
          payment_status?: string
          registered_at?: string
          session_schedule_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gym_session_participants_package_assignment_id_fkey"
            columns: ["package_assignment_id"]
            isOneToOne: false
            referencedRelation: "gym_package_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gym_session_participants_session_schedule_id_fkey"
            columns: ["session_schedule_id"]
            isOneToOne: false
            referencedRelation: "gym_session_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_session_schedules: {
        Row: {
          actual_participants: number
          assigned_trainer_id: string | null
          cancellation_reason: string | null
          cancelled_at: string | null
          cancelled_by: string | null
          created_at: string
          end_datetime: string
          free_cancellation_hours: number | null
          gym_group_session_id: string
          id: string
          notes: string | null
          start_datetime: string
          status: string
          updated_at: string
        }
        Insert: {
          actual_participants?: number
          assigned_trainer_id?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          created_at?: string
          end_datetime: string
          free_cancellation_hours?: number | null
          gym_group_session_id: string
          id?: string
          notes?: string | null
          start_datetime: string
          status?: string
          updated_at?: string
        }
        Update: {
          actual_participants?: number
          assigned_trainer_id?: string | null
          cancellation_reason?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          created_at?: string
          end_datetime?: string
          free_cancellation_hours?: number | null
          gym_group_session_id?: string
          id?: string
          notes?: string | null
          start_datetime?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gym_session_schedules_gym_group_session_id_fkey"
            columns: ["gym_group_session_id"]
            isOneToOne: false
            referencedRelation: "gym_group_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_session_trainers: {
        Row: {
          assigned_at: string
          compensation_amount: number | null
          compensation_type: string
          created_at: string
          id: string
          role: string
          session_schedule_id: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          assigned_at?: string
          compensation_amount?: number | null
          compensation_type?: string
          created_at?: string
          id?: string
          role?: string
          session_schedule_id: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          assigned_at?: string
          compensation_amount?: number | null
          compensation_type?: string
          created_at?: string
          id?: string
          role?: string
          session_schedule_id?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gym_session_trainers_session_schedule_id_fkey"
            columns: ["session_schedule_id"]
            isOneToOne: false
            referencedRelation: "gym_session_schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_trainer_assignments: {
        Row: {
          assigned_at: string
          assignment_type: string
          client_id: string
          created_at: string
          gym_id: string
          id: string
          notes: string | null
          status: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          assigned_at?: string
          assignment_type?: string
          client_id: string
          created_at?: string
          gym_id: string
          id?: string
          notes?: string | null
          status?: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          assigned_at?: string
          assignment_type?: string
          client_id?: string
          created_at?: string
          gym_id?: string
          id?: string
          notes?: string | null
          status?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      gym_trainer_contracts: {
        Row: {
          base_salary: number | null
          commission_rate: number | null
          contract_type: string
          created_at: string
          end_date: string | null
          gym_id: string
          id: string
          start_date: string
          status: string
          terms: string | null
          trainer_id: string
          updated_at: string
        }
        Insert: {
          base_salary?: number | null
          commission_rate?: number | null
          contract_type?: string
          created_at?: string
          end_date?: string | null
          gym_id: string
          id?: string
          start_date?: string
          status?: string
          terms?: string | null
          trainer_id: string
          updated_at?: string
        }
        Update: {
          base_salary?: number | null
          commission_rate?: number | null
          contract_type?: string
          created_at?: string
          end_date?: string | null
          gym_id?: string
          id?: string
          start_date?: string
          status?: string
          terms?: string | null
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          client_user_id: string | null
          conversion_date: string | null
          created_at: string
          email: string | null
          first_contact_date: string | null
          id: string
          invitation_id: string | null
          last_activity_date: string | null
          name: string
          notes: string | null
          phone: string | null
          source: string | null
          status: string | null
          trainer_id: string
          transitioned_to_client: boolean | null
          updated_at: string
        }
        Insert: {
          client_user_id?: string | null
          conversion_date?: string | null
          created_at?: string
          email?: string | null
          first_contact_date?: string | null
          id?: string
          invitation_id?: string | null
          last_activity_date?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          trainer_id: string
          transitioned_to_client?: boolean | null
          updated_at?: string
        }
        Update: {
          client_user_id?: string | null
          conversion_date?: string | null
          created_at?: string
          email?: string | null
          first_contact_date?: string | null
          id?: string
          invitation_id?: string | null
          last_activity_date?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          trainer_id?: string
          transitioned_to_client?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "client_invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      message_automation_rules: {
        Row: {
          created_at: string
          days_before: number | null
          id: string
          is_active: boolean | null
          specific_conditions: Json | null
          target_audience: string | null
          template_id: string
          trigger_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          days_before?: number | null
          id?: string
          is_active?: boolean | null
          specific_conditions?: Json | null
          target_audience?: string | null
          template_id: string
          trigger_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          days_before?: number | null
          id?: string
          is_active?: boolean | null
          specific_conditions?: Json | null
          target_audience?: string | null
          template_id?: string
          trigger_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_automation_rules_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "message_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      message_templates: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          subject: string
          template_type: string
          updated_at: string
          user_id: string
          variables: Json | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          subject: string
          template_type: string
          updated_at?: string
          user_id: string
          variables?: Json | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          subject?: string
          template_type?: string
          updated_at?: string
          user_id?: string
          variables?: Json | null
        }
        Relationships: []
      }
      nutrition_plans: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by_ai: boolean | null
          daily_calories: number | null
          description: string | null
          id: string
          macros: Json | null
          meal_plan: Json
          message_id: string | null
          started_at: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by_ai?: boolean | null
          daily_calories?: number | null
          description?: string | null
          id?: string
          macros?: Json | null
          meal_plan?: Json
          message_id?: string | null
          started_at?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by_ai?: boolean | null
          daily_calories?: number | null
          description?: string | null
          id?: string
          macros?: Json | null
          meal_plan?: Json
          message_id?: string | null
          started_at?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      package_assignments: {
        Row: {
          client_id: string
          created_at: string
          expiry_date: string | null
          id: string
          package_id: string | null
          purchase_date: string | null
          sessions_used: number | null
          status: string | null
          total_paid: number | null
          trainer_id: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          expiry_date?: string | null
          id?: string
          package_id?: string | null
          purchase_date?: string | null
          sessions_used?: number | null
          status?: string | null
          total_paid?: number | null
          trainer_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          expiry_date?: string | null
          id?: string
          package_id?: string | null
          purchase_date?: string | null
          sessions_used?: number | null
          status?: string | null
          total_paid?: number | null
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_assignments_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      package_payments: {
        Row: {
          amount: number
          created_at: string
          due_date: string | null
          id: string
          installment_number: number | null
          notes: string | null
          package_assignment_id: string | null
          paid_date: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id: string | null
          total_installments: number | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          due_date?: string | null
          id?: string
          installment_number?: number | null
          notes?: string | null
          package_assignment_id?: string | null
          paid_date?: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
          total_installments?: number | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string | null
          id?: string
          installment_number?: number | null
          notes?: string | null
          package_assignment_id?: string | null
          paid_date?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_payment_intent_id?: string | null
          total_installments?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_payments_package_assignment_id_fkey"
            columns: ["package_assignment_id"]
            isOneToOne: false
            referencedRelation: "package_assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          created_at: string
          description: string | null
          discount_percentage: number | null
          id: string
          is_active: boolean | null
          is_template: boolean | null
          package_type: Database["public"]["Enums"]["package_type"]
          price: number
          program_ids: string[] | null
          sessions_count: number | null
          title: string
          trainer_id: string
          updated_at: string
          validity_days: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          discount_percentage?: number | null
          id?: string
          is_active?: boolean | null
          is_template?: boolean | null
          package_type?: Database["public"]["Enums"]["package_type"]
          price: number
          program_ids?: string[] | null
          sessions_count?: number | null
          title: string
          trainer_id: string
          updated_at?: string
          validity_days?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          discount_percentage?: number | null
          id?: string
          is_active?: boolean | null
          is_template?: boolean | null
          package_type?: Database["public"]["Enums"]["package_type"]
          price?: number
          program_ids?: string[] | null
          sessions_count?: number | null
          title?: string
          trainer_id?: string
          updated_at?: string
          validity_days?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          emergency_contact: string | null
          emergency_phone: string | null
          fitness_goals: Json | null
          fitness_level: string | null
          full_name: string | null
          gender: string | null
          height: number | null
          id: string
          medical_conditions: string | null
          phone: string | null
          preferences: Json | null
          updated_at: string | null
          user_type: string
          weight: number | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          emergency_contact?: string | null
          emergency_phone?: string | null
          fitness_goals?: Json | null
          fitness_level?: string | null
          full_name?: string | null
          gender?: string | null
          height?: number | null
          id: string
          medical_conditions?: string | null
          phone?: string | null
          preferences?: Json | null
          updated_at?: string | null
          user_type?: string
          weight?: number | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          emergency_contact?: string | null
          emergency_phone?: string | null
          fitness_goals?: Json | null
          fitness_level?: string | null
          full_name?: string | null
          gender?: string | null
          height?: number | null
          id?: string
          medical_conditions?: string | null
          phone?: string | null
          preferences?: Json | null
          updated_at?: string | null
          user_type?: string
          weight?: number | null
        }
        Relationships: []
      }
      program_assignments: {
        Row: {
          actual_end_date: string | null
          client_id: string
          created_at: string
          estimated_end_date: string
          id: string
          program_id: string
          sessions_completed: number
          start_date: string
          target_frequency: number
          total_sessions_planned: number
          trainer_id: string
          updated_at: string
        }
        Insert: {
          actual_end_date?: string | null
          client_id: string
          created_at?: string
          estimated_end_date: string
          id?: string
          program_id: string
          sessions_completed?: number
          start_date?: string
          target_frequency?: number
          total_sessions_planned: number
          trainer_id: string
          updated_at?: string
        }
        Update: {
          actual_end_date?: string | null
          client_id?: string
          created_at?: string
          estimated_end_date?: string
          id?: string
          program_id?: string
          sessions_completed?: number
          start_date?: string
          target_frequency?: number
          total_sessions_planned?: number
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      sales_activities: {
        Row: {
          activity_type: string
          calendar_event_id: string | null
          completed_date: string | null
          created_at: string
          description: string | null
          id: string
          lead_id: string | null
          outcome: string | null
          scheduled_date: string | null
          title: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          activity_type: string
          calendar_event_id?: string | null
          completed_date?: string | null
          created_at?: string
          description?: string | null
          id?: string
          lead_id?: string | null
          outcome?: string | null
          scheduled_date?: string | null
          title: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          activity_type?: string
          calendar_event_id?: string | null
          completed_date?: string | null
          created_at?: string
          description?: string | null
          id?: string
          lead_id?: string | null
          outcome?: string | null
          scheduled_date?: string | null
          title?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_activities_calendar_event_id_fkey"
            columns: ["calendar_event_id"]
            isOneToOne: false
            referencedRelation: "calendar_events"
            referencedColumns: ["id"]
          },
        ]
      }
      session_postponement_responses: {
        Row: {
          created_at: string
          id: string
          participant_email: string
          participant_id: string
          participant_name: string
          postponement_id: string
          refund_amount: number | null
          refund_processed: boolean
          requires_refund: boolean
          responded_at: string | null
          response: string
          response_reason: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          participant_email: string
          participant_id: string
          participant_name: string
          postponement_id: string
          refund_amount?: number | null
          refund_processed?: boolean
          requires_refund?: boolean
          responded_at?: string | null
          response: string
          response_reason?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          participant_email?: string
          participant_id?: string
          participant_name?: string
          postponement_id?: string
          refund_amount?: number | null
          refund_processed?: boolean
          requires_refund?: boolean
          responded_at?: string | null
          response?: string
          response_reason?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      session_postponements: {
        Row: {
          accepted_count: number
          calendar_event_id: string
          created_at: string
          deadline_for_responses: string
          declined_count: number
          id: string
          new_end_datetime: string
          new_start_datetime: string
          original_end_datetime: string
          original_start_datetime: string
          reason: string | null
          status: string
          total_participants: number
          trainer_id: string
          updated_at: string
        }
        Insert: {
          accepted_count?: number
          calendar_event_id: string
          created_at?: string
          deadline_for_responses: string
          declined_count?: number
          id?: string
          new_end_datetime: string
          new_start_datetime: string
          original_end_datetime: string
          original_start_datetime: string
          reason?: string | null
          status?: string
          total_participants?: number
          trainer_id: string
          updated_at?: string
        }
        Update: {
          accepted_count?: number
          calendar_event_id?: string
          created_at?: string
          deadline_for_responses?: string
          declined_count?: number
          id?: string
          new_end_datetime?: string
          new_start_datetime?: string
          original_end_datetime?: string
          original_start_datetime?: string
          reason?: string | null
          status?: string
          total_participants?: number
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      session_refunds: {
        Row: {
          amount: number
          created_at: string
          id: string
          participant_id: string
          payment_method: string
          postponement_response_id: string
          processed_at: string | null
          status: string
          stripe_refund_id: string | null
          trainer_id: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          participant_id: string
          payment_method?: string
          postponement_response_id: string
          processed_at?: string | null
          status?: string
          stripe_refund_id?: string | null
          trainer_id: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          participant_id?: string
          payment_method?: string
          postponement_response_id?: string
          processed_at?: string | null
          status?: string
          stripe_refund_id?: string | null
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          early_adopter_number: number | null
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end_date: string | null
          subscription_start_date: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          early_adopter_number?: number | null
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          early_adopter_number?: number | null
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      trainer_availability: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          gym_id: string
          id: string
          is_active: boolean
          start_time: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          gym_id: string
          id?: string
          is_active?: boolean
          start_time: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          gym_id?: string
          id?: string
          is_active?: boolean
          start_time?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      trainer_client_relationships: {
        Row: {
          client_id: string
          created_at: string
          id: string
          invitation_id: string | null
          status: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          invitation_id?: string | null
          status?: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          invitation_id?: string | null
          status?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trainer_client_relationships_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "client_invitations"
            referencedColumns: ["id"]
          },
        ]
      }
      trainer_gym_affiliations: {
        Row: {
          commission_rate: number | null
          contract_details: Json | null
          created_at: string
          gym_id: string
          id: string
          is_primary: boolean | null
          request_message: string | null
          requested_at: string
          responded_at: string | null
          response_message: string | null
          status: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          commission_rate?: number | null
          contract_details?: Json | null
          created_at?: string
          gym_id: string
          id?: string
          is_primary?: boolean | null
          request_message?: string | null
          requested_at?: string
          responded_at?: string | null
          response_message?: string | null
          status?: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          commission_rate?: number | null
          contract_details?: Json | null
          created_at?: string
          gym_id?: string
          id?: string
          is_primary?: boolean | null
          request_message?: string | null
          requested_at?: string
          responded_at?: string | null
          response_message?: string | null
          status?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      trainer_notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          related_client_id: string | null
          related_program_assignment_id: string | null
          trainer_id: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          related_client_id?: string | null
          related_program_assignment_id?: string | null
          trainer_id: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          related_client_id?: string | null
          related_program_assignment_id?: string | null
          trainer_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "trainer_notifications_related_program_assignment_id_fkey"
            columns: ["related_program_assignment_id"]
            isOneToOne: false
            referencedRelation: "program_assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      trainer_profiles: {
        Row: {
          bio: string | null
          certifications: Json | null
          created_at: string
          education: Json | null
          experience: Json | null
          hourly_rate: number | null
          id: string
          is_public: boolean | null
          languages: string[] | null
          location: string | null
          primary_gym_id: string | null
          profile_image_url: string | null
          slug: string | null
          specialties: string[] | null
          title: string | null
          trainer_id: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          certifications?: Json | null
          created_at?: string
          education?: Json | null
          experience?: Json | null
          hourly_rate?: number | null
          id?: string
          is_public?: boolean | null
          languages?: string[] | null
          location?: string | null
          primary_gym_id?: string | null
          profile_image_url?: string | null
          slug?: string | null
          specialties?: string[] | null
          title?: string | null
          trainer_id: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          certifications?: Json | null
          created_at?: string
          education?: Json | null
          experience?: Json | null
          hourly_rate?: number | null
          id?: string
          is_public?: boolean | null
          languages?: string[] | null
          location?: string | null
          primary_gym_id?: string | null
          profile_image_url?: string | null
          slug?: string | null
          specialties?: string[] | null
          title?: string | null
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      trainer_reviews: {
        Row: {
          client_id: string
          comment: string | null
          created_at: string
          id: string
          is_verified: boolean | null
          rating: number
          session_date: string | null
          trainer_id: string
          updated_at: string
        }
        Insert: {
          client_id: string
          comment?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          rating: number
          session_date?: string | null
          trainer_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          is_verified?: boolean | null
          rating?: number
          session_date?: string | null
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      trainer_shifts: {
        Row: {
          created_at: string
          end_datetime: string
          gym_id: string
          id: string
          notes: string | null
          shift_type: string
          start_datetime: string
          status: string
          trainer_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_datetime: string
          gym_id: string
          id?: string
          notes?: string | null
          shift_type?: string
          start_datetime: string
          status?: string
          trainer_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_datetime?: string
          gym_id?: string
          id?: string
          notes?: string | null
          shift_type?: string
          start_datetime?: string
          status?: string
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      training_plans: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by_ai: boolean | null
          description: string | null
          difficulty_level: string | null
          duration_weeks: number | null
          goals: Json | null
          id: string
          message_id: string | null
          plan_data: Json
          started_at: string | null
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by_ai?: boolean | null
          description?: string | null
          difficulty_level?: string | null
          duration_weeks?: number | null
          goals?: Json | null
          id?: string
          message_id?: string | null
          plan_data?: Json
          started_at?: string | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by_ai?: boolean | null
          description?: string | null
          difficulty_level?: string | null
          duration_weeks?: number | null
          goals?: Json | null
          id?: string
          message_id?: string | null
          plan_data?: Json
          started_at?: string | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_messages: {
        Row: {
          content: string | null
          conversation_id: string
          created_at: string
          file_name: string | null
          id: string
          media_url: string | null
          message_type: string
          sender: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          conversation_id: string
          created_at?: string
          file_name?: string | null
          id?: string
          media_url?: string | null
          message_type?: string
          sender: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          conversation_id?: string
          created_at?: string
          file_name?: string | null
          id?: string
          media_url?: string | null
          message_type?: string
          sender?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          early_adopter_number: number | null
          id: string
          subscription_end_date: string | null
          subscription_start_date: string | null
          subscription_status: string
          subscription_tier: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          early_adopter_number?: number | null
          id?: string
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_status?: string
          subscription_tier?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          early_adopter_number?: number | null
          id?: string
          subscription_end_date?: string | null
          subscription_start_date?: string | null
          subscription_status?: string
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_trainer_assignments: {
        Row: {
          assigned_date: string
          assignment_type: string
          created_at: string
          id: string
          notes: string | null
          status: string
          trainer_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_date?: string
          assignment_type?: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          trainer_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_date?: string
          assignment_type?: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
          trainer_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      expire_old_invitations: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_expiring_program_notifications: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_trainer_slug: {
        Args: { trainer_name: string }
        Returns: string
      }
      initialize_default_email_templates: {
        Args: { gym_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      event_category:
        | "session"
        | "program_milestone"
        | "sales_activity"
        | "personal_task"
        | "deadline"
        | "availability"
      invitation_status: "pending" | "accepted" | "declined" | "expired"
      package_type: "sessions_only" | "program_only" | "hybrid" | "service"
      payment_method: "cash" | "stripe" | "installments"
      payment_status: "pending" | "paid" | "overdue" | "cancelled"
      postponement_status:
        | "pending"
        | "collecting_responses"
        | "partially_accepted"
        | "fully_accepted"
        | "rejected"
        | "cancelled"
        | "confirmed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      event_category: [
        "session",
        "program_milestone",
        "sales_activity",
        "personal_task",
        "deadline",
        "availability",
      ],
      invitation_status: ["pending", "accepted", "declined", "expired"],
      package_type: ["sessions_only", "program_only", "hybrid", "service"],
      payment_method: ["cash", "stripe", "installments"],
      payment_status: ["pending", "paid", "overdue", "cancelled"],
      postponement_status: [
        "pending",
        "collecting_responses",
        "partially_accepted",
        "fully_accepted",
        "rejected",
        "cancelled",
        "confirmed",
      ],
    },
  },
} as const
