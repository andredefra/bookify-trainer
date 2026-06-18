export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ai_usage_tracking: {
        Row: {
          context: string | null
          cost_estimate: number | null
          created_at: string
          feature: string
          id: string
          tokens_used: number | null
          user_id: string
        }
        Insert: {
          context?: string | null
          cost_estimate?: number | null
          created_at?: string
          feature: string
          id?: string
          tokens_used?: number | null
          user_id: string
        }
        Update: {
          context?: string | null
          cost_estimate?: number | null
          created_at?: string
          feature?: string
          id?: string
          tokens_used?: number | null
          user_id?: string
        }
        Relationships: []
      }
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
      check_in_settings: {
        Row: {
          client_id: string
          created_at: string
          custom_questions: Json | null
          enabled: boolean
          frequency: string
          id: string
          include_measurements: boolean
          include_mood: boolean
          include_notes: boolean
          include_photos: boolean
          include_weight: boolean
          reminder_days_before: number | null
          reminder_time: string | null
          trainer_id: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          custom_questions?: Json | null
          enabled?: boolean
          frequency?: string
          id?: string
          include_measurements?: boolean
          include_mood?: boolean
          include_notes?: boolean
          include_photos?: boolean
          include_weight?: boolean
          reminder_days_before?: number | null
          reminder_time?: string | null
          trainer_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          custom_questions?: Json | null
          enabled?: boolean
          frequency?: string
          id?: string
          include_measurements?: boolean
          include_mood?: boolean
          include_notes?: boolean
          include_photos?: boolean
          include_weight?: boolean
          reminder_days_before?: number | null
          reminder_time?: string | null
          trainer_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      check_in_submissions: {
        Row: {
          client_id: string
          completed_at: string | null
          created_at: string
          custom_answers: Json | null
          due_date: string
          energy_level: number | null
          id: string
          measurements: Json | null
          mood_rating: number | null
          notes: string | null
          photos: Json | null
          settings_id: string
          sleep_quality: number | null
          status: string
          trainer_feedback: string | null
          trainer_id: string
          trainer_reviewed_at: string | null
          updated_at: string
          weight: number | null
        }
        Insert: {
          client_id: string
          completed_at?: string | null
          created_at?: string
          custom_answers?: Json | null
          due_date: string
          energy_level?: number | null
          id?: string
          measurements?: Json | null
          mood_rating?: number | null
          notes?: string | null
          photos?: Json | null
          settings_id: string
          sleep_quality?: number | null
          status?: string
          trainer_feedback?: string | null
          trainer_id: string
          trainer_reviewed_at?: string | null
          updated_at?: string
          weight?: number | null
        }
        Update: {
          client_id?: string
          completed_at?: string | null
          created_at?: string
          custom_answers?: Json | null
          due_date?: string
          energy_level?: number | null
          id?: string
          measurements?: Json | null
          mood_rating?: number | null
          notes?: string | null
          photos?: Json | null
          settings_id?: string
          sleep_quality?: number | null
          status?: string
          trainer_feedback?: string | null
          trainer_id?: string
          trainer_reviewed_at?: string | null
          updated_at?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "check_in_submissions_settings_id_fkey"
            columns: ["settings_id"]
            isOneToOne: false
            referencedRelation: "check_in_settings"
            referencedColumns: ["id"]
          },
        ]
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
          gym_commission_rate: number | null
          id: string
          package_id: string
          purchase_date: string | null
          sessions_total: number
          sessions_used: number | null
          source_id: string | null
          source_type: string | null
          status: string | null
          total_paid: number | null
          trainer_id: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          expiry_date?: string | null
          gym_commission_rate?: number | null
          id?: string
          package_id: string
          purchase_date?: string | null
          sessions_total: number
          sessions_used?: number | null
          source_id?: string | null
          source_type?: string | null
          status?: string | null
          total_paid?: number | null
          trainer_id: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          expiry_date?: string | null
          gym_commission_rate?: number | null
          id?: string
          package_id?: string
          purchase_date?: string | null
          sessions_total?: number
          sessions_used?: number | null
          source_id?: string | null
          source_type?: string | null
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
          due_date: string | null
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
          due_date?: string | null
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
          due_date?: string | null
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
          is_public: boolean | null
          package_type: string
          price: number
          sessions_count: number | null
          title: string
          trainer_id: string
          training_program_data: Json | null
          updated_at: string | null
          validity_days: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_public?: boolean | null
          package_type: string
          price: number
          sessions_count?: number | null
          title: string
          trainer_id: string
          training_program_data?: Json | null
          updated_at?: string | null
          validity_days?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_public?: boolean | null
          package_type?: string
          price?: number
          sessions_count?: number | null
          title?: string
          trainer_id?: string
          training_program_data?: Json | null
          updated_at?: string | null
          validity_days?: number | null
        }
        Relationships: []
      }
      client_subscriptions: {
        Row: {
          cancelled_at: string | null
          created_at: string
          id: string
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          subscription_end_date: string | null
          subscription_plan: string
          subscription_start_date: string | null
          subscription_status: string
          trial_end_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancelled_at?: string | null
          created_at?: string
          id?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end_date?: string | null
          subscription_plan?: string
          subscription_start_date?: string | null
          subscription_status?: string
          trial_end_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancelled_at?: string | null
          created_at?: string
          id?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end_date?: string | null
          subscription_plan?: string
          subscription_start_date?: string | null
          subscription_status?: string
          trial_end_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      client_training_session_progress: {
        Row: {
          client_id: string
          completed_by: string | null
          created_at: string | null
          exercise_data: Json
          id: string
          program_id: string
          session_completed: boolean | null
          session_id: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          completed_by?: string | null
          created_at?: string | null
          exercise_data?: Json
          id?: string
          program_id: string
          session_completed?: boolean | null
          session_id: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          completed_by?: string | null
          created_at?: string | null
          exercise_data?: Json
          id?: string
          program_id?: string
          session_completed?: boolean | null
          session_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          client_id: string
          created_at: string | null
          id: string
          last_message_at: string | null
          trainer_id: string
          updated_at: string | null
        }
        Insert: {
          client_id: string
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          trainer_id: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          created_at?: string | null
          id?: string
          last_message_at?: string | null
          trainer_id?: string
          updated_at?: string | null
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
      gym_service_requests: {
        Row: {
          client_id: string
          commission_rate: number | null
          completed_at: string | null
          created_at: string | null
          details: Json | null
          gym_id: string
          id: string
          notes: string | null
          request_type: string
          responded_at: string | null
          status: string | null
          trainer_id: string
          trainer_response: string | null
          updated_at: string | null
        }
        Insert: {
          client_id: string
          commission_rate?: number | null
          completed_at?: string | null
          created_at?: string | null
          details?: Json | null
          gym_id: string
          id?: string
          notes?: string | null
          request_type: string
          responded_at?: string | null
          status?: string | null
          trainer_id: string
          trainer_response?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string
          commission_rate?: number | null
          completed_at?: string | null
          created_at?: string | null
          details?: Json | null
          gym_id?: string
          id?: string
          notes?: string | null
          request_type?: string
          responded_at?: string | null
          status?: string | null
          trainer_id?: string
          trainer_response?: string | null
          updated_at?: string | null
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
      gyms: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          custom_css: string | null
          description: string | null
          id: string
          logo_url: string | null
          name: string
          owner_id: string
          primary_color: string | null
          secondary_color: string | null
          sidebar_bg_color: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          custom_css?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          owner_id: string
          primary_color?: string | null
          secondary_color?: string | null
          sidebar_bg_color?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          custom_css?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          owner_id?: string
          primary_color?: string | null
          secondary_color?: string | null
          sidebar_bg_color?: string | null
          updated_at?: string
          website?: string | null
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
      mkt_admins: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      mkt_brand_assets: {
        Row: {
          asset_type: string | null
          created_at: string
          file_url: string | null
          hex: string | null
          id: string
          name: string
          notes: string | null
        }
        Insert: {
          asset_type?: string | null
          created_at?: string
          file_url?: string | null
          hex?: string | null
          id?: string
          name: string
          notes?: string | null
        }
        Update: {
          asset_type?: string | null
          created_at?: string
          file_url?: string | null
          hex?: string | null
          id?: string
          name?: string
          notes?: string | null
        }
        Relationships: []
      }
      mkt_brand_docs: {
        Row: {
          content: string | null
          created_at: string
          doc_type: string | null
          file_url: string | null
          id: string
          is_active: boolean
          processed_at: string | null
          processing_error: string | null
          processing_status: string
          recap: string | null
          title: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          doc_type?: string | null
          file_url?: string | null
          id?: string
          is_active?: boolean
          processed_at?: string | null
          processing_error?: string | null
          processing_status?: string
          recap?: string | null
          title: string
        }
        Update: {
          content?: string | null
          created_at?: string
          doc_type?: string | null
          file_url?: string | null
          id?: string
          is_active?: boolean
          processed_at?: string | null
          processing_error?: string | null
          processing_status?: string
          recap?: string | null
          title?: string
        }
        Relationships: []
      }
      mkt_connectors: {
        Row: {
          config: Json | null
          connector_name: string
          created_at: string
          id: string
          notes: string | null
          status: string
        }
        Insert: {
          config?: Json | null
          connector_name: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
        }
        Update: {
          config?: Json | null
          connector_name?: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: string
        }
        Relationships: []
      }
      mkt_content: {
        Row: {
          content_format: string | null
          content_type: string | null
          created_at: string
          cta: string | null
          dms_received: number | null
          funnel_stage: string | null
          hook: string | null
          id: string
          media_prompt: string | null
          media_url: string | null
          notes: string | null
          objective: string | null
          persona_id: string | null
          plan_phase_id: string | null
          post_copy: string | null
          published_at: string | null
          published_link: string | null
          scheduled_date: string | null
          scheduled_time: string | null
          sequence_number: number | null
          situation: string | null
          social_channel: string | null
          status: string
          updated_at: string
          views: number | null
        }
        Insert: {
          content_format?: string | null
          content_type?: string | null
          created_at?: string
          cta?: string | null
          dms_received?: number | null
          funnel_stage?: string | null
          hook?: string | null
          id?: string
          media_prompt?: string | null
          media_url?: string | null
          notes?: string | null
          objective?: string | null
          persona_id?: string | null
          plan_phase_id?: string | null
          post_copy?: string | null
          published_at?: string | null
          published_link?: string | null
          scheduled_date?: string | null
          scheduled_time?: string | null
          sequence_number?: number | null
          situation?: string | null
          social_channel?: string | null
          status?: string
          updated_at?: string
          views?: number | null
        }
        Update: {
          content_format?: string | null
          content_type?: string | null
          created_at?: string
          cta?: string | null
          dms_received?: number | null
          funnel_stage?: string | null
          hook?: string | null
          id?: string
          media_prompt?: string | null
          media_url?: string | null
          notes?: string | null
          objective?: string | null
          persona_id?: string | null
          plan_phase_id?: string | null
          post_copy?: string | null
          published_at?: string | null
          published_link?: string | null
          scheduled_date?: string | null
          scheduled_time?: string | null
          sequence_number?: number | null
          situation?: string | null
          social_channel?: string | null
          status?: string
          updated_at?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mkt_content_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "mkt_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mkt_content_plan_month_id_fkey"
            columns: ["plan_phase_id"]
            isOneToOne: false
            referencedRelation: "mkt_plan_phases"
            referencedColumns: ["id"]
          },
        ]
      }
      mkt_dm_presets: {
        Row: {
          age_bucket: string
          body_template: string
          channel: string
          city_filter: string
          created_at: string
          gender: string
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          age_bucket?: string
          body_template: string
          channel?: string
          city_filter?: string
          created_at?: string
          gender?: string
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          age_bucket?: string
          body_template?: string
          channel?: string
          city_filter?: string
          created_at?: string
          gender?: string
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      mkt_generations: {
        Row: {
          content_id: string
          created_at: string
          gen_type: string
          id: string
          is_selected: boolean
          output: string
        }
        Insert: {
          content_id: string
          created_at?: string
          gen_type: string
          id?: string
          is_selected?: boolean
          output: string
        }
        Update: {
          content_id?: string
          created_at?: string
          gen_type?: string
          id?: string
          is_selected?: boolean
          output?: string
        }
        Relationships: [
          {
            foreignKeyName: "mkt_generations_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "mkt_content"
            referencedColumns: ["id"]
          },
        ]
      }
      mkt_mcp_connections: {
        Row: {
          auth_url: string | null
          client_registration: Json | null
          created_at: string
          email: string | null
          id: string
          last_check_at: string | null
          last_error: string | null
          mcp_url: string
          oauth_tokens: Json | null
          provider: string
          status: string
          updated_at: string
        }
        Insert: {
          auth_url?: string | null
          client_registration?: Json | null
          created_at?: string
          email?: string | null
          id?: string
          last_check_at?: string | null
          last_error?: string | null
          mcp_url: string
          oauth_tokens?: Json | null
          provider: string
          status?: string
          updated_at?: string
        }
        Update: {
          auth_url?: string | null
          client_registration?: Json | null
          created_at?: string
          email?: string | null
          id?: string
          last_check_at?: string | null
          last_error?: string | null
          mcp_url?: string
          oauth_tokens?: Json | null
          provider?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      mkt_outreach_actions: {
        Row: {
          contact_id: string
          created_at: string
          error: string | null
          executed_at: string | null
          id: string
          payload: Json | null
          preset_id: string | null
          response: Json | null
          run_id: string
          scheduled_for: string
          status: string
          step: string
          step_order: number
          updated_at: string
        }
        Insert: {
          contact_id: string
          created_at?: string
          error?: string | null
          executed_at?: string | null
          id?: string
          payload?: Json | null
          preset_id?: string | null
          response?: Json | null
          run_id: string
          scheduled_for?: string
          status?: string
          step: string
          step_order?: number
          updated_at?: string
        }
        Update: {
          contact_id?: string
          created_at?: string
          error?: string | null
          executed_at?: string | null
          id?: string
          payload?: Json | null
          preset_id?: string | null
          response?: Json | null
          run_id?: string
          scheduled_for?: string
          status?: string
          step?: string
          step_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mkt_outreach_actions_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "mkt_outreach_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mkt_outreach_actions_preset_id_fkey"
            columns: ["preset_id"]
            isOneToOne: false
            referencedRelation: "mkt_dm_presets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mkt_outreach_actions_run_id_fkey"
            columns: ["run_id"]
            isOneToOne: false
            referencedRelation: "mkt_outreach_runs"
            referencedColumns: ["id"]
          },
        ]
      }
      mkt_outreach_contacts: {
        Row: {
          age_bucket: string | null
          audience_age: string | null
          audience_city: string | null
          avg_reel_plays: number | null
          avg_views: number | null
          created_at: string
          creator: string | null
          email: string | null
          engagement: number | null
          er: number | null
          followers: number | null
          gender: string | null
          id: string
          is_milan: boolean | null
          list_id: string
          status: string
          updated_at: string
          username: string
        }
        Insert: {
          age_bucket?: string | null
          audience_age?: string | null
          audience_city?: string | null
          avg_reel_plays?: number | null
          avg_views?: number | null
          created_at?: string
          creator?: string | null
          email?: string | null
          engagement?: number | null
          er?: number | null
          followers?: number | null
          gender?: string | null
          id?: string
          is_milan?: boolean | null
          list_id: string
          status?: string
          updated_at?: string
          username: string
        }
        Update: {
          age_bucket?: string | null
          audience_age?: string | null
          audience_city?: string | null
          avg_reel_plays?: number | null
          avg_views?: number | null
          created_at?: string
          creator?: string | null
          email?: string | null
          engagement?: number | null
          er?: number | null
          followers?: number | null
          gender?: string | null
          id?: string
          is_milan?: boolean | null
          list_id?: string
          status?: string
          updated_at?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "mkt_outreach_contacts_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "mkt_outreach_lists"
            referencedColumns: ["id"]
          },
        ]
      }
      mkt_outreach_lists: {
        Row: {
          created_at: string
          id: string
          instagram_target_page: string | null
          name: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          instagram_target_page?: string | null
          name: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          instagram_target_page?: string | null
          name?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      mkt_outreach_replies: {
        Row: {
          action_id: string | null
          channel: string
          contact_id: string
          created_at: string
          id: string
          raw: Json | null
          received_at: string
          sentiment: string | null
          text: string | null
        }
        Insert: {
          action_id?: string | null
          channel: string
          contact_id: string
          created_at?: string
          id?: string
          raw?: Json | null
          received_at?: string
          sentiment?: string | null
          text?: string | null
        }
        Update: {
          action_id?: string | null
          channel?: string
          contact_id?: string
          created_at?: string
          id?: string
          raw?: Json | null
          received_at?: string
          sentiment?: string | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mkt_outreach_replies_action_id_fkey"
            columns: ["action_id"]
            isOneToOne: false
            referencedRelation: "mkt_outreach_actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mkt_outreach_replies_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "mkt_outreach_contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      mkt_outreach_runs: {
        Row: {
          config: Json
          created_at: string
          finished_at: string | null
          id: string
          last_tick_at: string | null
          list_id: string
          mcp_connection_id: string | null
          name: string
          started_at: string | null
          stats: Json
          status: string
          updated_at: string
        }
        Insert: {
          config?: Json
          created_at?: string
          finished_at?: string | null
          id?: string
          last_tick_at?: string | null
          list_id: string
          mcp_connection_id?: string | null
          name: string
          started_at?: string | null
          stats?: Json
          status?: string
          updated_at?: string
        }
        Update: {
          config?: Json
          created_at?: string
          finished_at?: string | null
          id?: string
          last_tick_at?: string | null
          list_id?: string
          mcp_connection_id?: string | null
          name?: string
          started_at?: string | null
          stats?: Json
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "mkt_outreach_runs_list_id_fkey"
            columns: ["list_id"]
            isOneToOne: false
            referencedRelation: "mkt_outreach_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mkt_outreach_runs_mcp_connection_id_fkey"
            columns: ["mcp_connection_id"]
            isOneToOne: false
            referencedRelation: "mkt_mcp_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      mkt_personas: {
        Row: {
          age_range: string | null
          copy_focus: string | null
          created_at: string
          description: string | null
          id: string
          is_ai_generated: boolean
          name: string
          pain: string | null
          solution: string | null
          source_doc_id: string | null
        }
        Insert: {
          age_range?: string | null
          copy_focus?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_ai_generated?: boolean
          name: string
          pain?: string | null
          solution?: string | null
          source_doc_id?: string | null
        }
        Update: {
          age_range?: string | null
          copy_focus?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_ai_generated?: boolean
          name?: string
          pain?: string | null
          solution?: string | null
          source_doc_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mkt_personas_source_doc_id_fkey"
            columns: ["source_doc_id"]
            isOneToOne: false
            referencedRelation: "mkt_brand_docs"
            referencedColumns: ["id"]
          },
        ]
      }
      mkt_plan_phases: {
        Row: {
          closed_at: string | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          label: string | null
          phase_index: number
          start_date: string | null
          status: string
          target_post_count: number | null
          updated_at: string
        }
        Insert: {
          closed_at?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          label?: string | null
          phase_index: number
          start_date?: string | null
          status?: string
          target_post_count?: number | null
          updated_at?: string
        }
        Update: {
          closed_at?: string | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          label?: string | null
          phase_index?: number
          start_date?: string | null
          status?: string
          target_post_count?: number | null
          updated_at?: string
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
      package_session_bookings: {
        Row: {
          calendar_event_id: string | null
          client_id: string
          completed_datetime: string | null
          confirmed_datetime: string | null
          created_at: string | null
          duration_minutes: number | null
          id: string
          location: string | null
          notes: string | null
          package_assignment_id: string
          proposed_by: string | null
          proposed_datetime: string | null
          session_number: number
          session_type: string | null
          status: string | null
          trainer_id: string
          updated_at: string | null
        }
        Insert: {
          calendar_event_id?: string | null
          client_id: string
          completed_datetime?: string | null
          confirmed_datetime?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          location?: string | null
          notes?: string | null
          package_assignment_id: string
          proposed_by?: string | null
          proposed_datetime?: string | null
          session_number: number
          session_type?: string | null
          status?: string | null
          trainer_id: string
          updated_at?: string | null
        }
        Update: {
          calendar_event_id?: string | null
          client_id?: string
          completed_datetime?: string | null
          confirmed_datetime?: string | null
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          location?: string | null
          notes?: string | null
          package_assignment_id?: string
          proposed_by?: string | null
          proposed_datetime?: string | null
          session_number?: number
          session_type?: string | null
          status?: string | null
          trainer_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "package_session_bookings_calendar_event_id_fkey"
            columns: ["calendar_event_id"]
            isOneToOne: false
            referencedRelation: "calendar_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_session_bookings_package_assignment_id_fkey"
            columns: ["package_assignment_id"]
            isOneToOne: false
            referencedRelation: "client_package_assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          created_at: string
          creator_id: string | null
          creator_type: string | null
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
          creator_id?: string | null
          creator_type?: string | null
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
          creator_id?: string | null
          creator_type?: string | null
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
          gym_commission_rate: number | null
          id: string
          program_id: string
          sessions_completed: number
          source_id: string | null
          source_type: string | null
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
          gym_commission_rate?: number | null
          id?: string
          program_id: string
          sessions_completed?: number
          source_id?: string | null
          source_type?: string | null
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
          gym_commission_rate?: number | null
          id?: string
          program_id?: string
          sessions_completed?: number
          source_id?: string | null
          source_type?: string | null
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
      studio_client_relationships: {
        Row: {
          assigned_trainer_id: string | null
          client_id: string
          created_at: string | null
          id: string
          status: string | null
          studio_id: string
          updated_at: string | null
        }
        Insert: {
          assigned_trainer_id?: string | null
          client_id: string
          created_at?: string | null
          id?: string
          status?: string | null
          studio_id: string
          updated_at?: string | null
        }
        Update: {
          assigned_trainer_id?: string | null
          client_id?: string
          created_at?: string | null
          id?: string
          status?: string | null
          studio_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "studio_client_relationships_studio_id_fkey"
            columns: ["studio_id"]
            isOneToOne: false
            referencedRelation: "studios"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_trainer_assignments: {
        Row: {
          assigned_at: string | null
          commission_rate: number | null
          contract_details: Json | null
          created_at: string | null
          id: string
          status: string | null
          studio_id: string
          trainer_id: string
          updated_at: string | null
        }
        Insert: {
          assigned_at?: string | null
          commission_rate?: number | null
          contract_details?: Json | null
          created_at?: string | null
          id?: string
          status?: string | null
          studio_id: string
          trainer_id: string
          updated_at?: string | null
        }
        Update: {
          assigned_at?: string | null
          commission_rate?: number | null
          contract_details?: Json | null
          created_at?: string | null
          id?: string
          status?: string | null
          studio_id?: string
          trainer_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "studio_trainer_assignments_studio_id_fkey"
            columns: ["studio_id"]
            isOneToOne: false
            referencedRelation: "studios"
            referencedColumns: ["id"]
          },
        ]
      }
      studios: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          custom_css: string | null
          description: string | null
          id: string
          logo_url: string | null
          name: string
          owner_id: string
          primary_color: string | null
          secondary_color: string | null
          sidebar_bg_color: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          custom_css?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          owner_id: string
          primary_color?: string | null
          secondary_color?: string | null
          sidebar_bg_color?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          custom_css?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          owner_id?: string
          primary_color?: string | null
          secondary_color?: string | null
          sidebar_bg_color?: string | null
          updated_at?: string | null
          website?: string | null
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
      trainer_ai_subscriptions: {
        Row: {
          created_at: string | null
          id: string
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          subscription_end_date: string | null
          subscription_plan: string
          subscription_start_date: string | null
          subscription_status: string
          trial_end_date: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end_date?: string | null
          subscription_plan?: string
          subscription_start_date?: string | null
          subscription_status?: string
          trial_end_date?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end_date?: string | null
          subscription_plan?: string
          subscription_start_date?: string | null
          subscription_status?: string
          trial_end_date?: string | null
          updated_at?: string | null
          user_id?: string
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
      trainer_client_messages: {
        Row: {
          content: string | null
          conversation_id: string
          created_at: string | null
          file_name: string | null
          id: string
          media_duration: number | null
          media_size: number | null
          media_thumbnail_url: string | null
          media_url: string | null
          message_type: string
          read_at: string | null
          sender_id: string
          sender_type: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          conversation_id: string
          created_at?: string | null
          file_name?: string | null
          id?: string
          media_duration?: number | null
          media_size?: number | null
          media_thumbnail_url?: string | null
          media_url?: string | null
          message_type?: string
          read_at?: string | null
          sender_id: string
          sender_type: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          conversation_id?: string
          created_at?: string | null
          file_name?: string | null
          id?: string
          media_duration?: number | null
          media_size?: number | null
          media_thumbnail_url?: string | null
          media_url?: string | null
          message_type?: string
          read_at?: string | null
          sender_id?: string
          sender_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trainer_client_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
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
          related_package_assignment_id: string | null
          related_program_assignment_id: string | null
          request_id: string | null
          source_id: string | null
          source_type: string | null
          trainer_id: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          related_client_id?: string | null
          related_package_assignment_id?: string | null
          related_program_assignment_id?: string | null
          request_id?: string | null
          source_id?: string | null
          source_type?: string | null
          trainer_id: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          related_client_id?: string | null
          related_package_assignment_id?: string | null
          related_program_assignment_id?: string | null
          request_id?: string | null
          source_id?: string | null
          source_type?: string | null
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
      user_profiles: {
        Row: {
          allergies: string | null
          city: string | null
          created_at: string
          date_of_birth: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          experience_level: string | null
          first_name: string | null
          fitness_goals: string[] | null
          gender: string | null
          health_conditions: string | null
          height: number | null
          id: string
          last_name: string | null
          physical_limitations: string | null
          preferred_workout_time: string | null
          profile_image_url: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          allergies?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          experience_level?: string | null
          first_name?: string | null
          fitness_goals?: string[] | null
          gender?: string | null
          health_conditions?: string | null
          height?: number | null
          id?: string
          last_name?: string | null
          physical_limitations?: string | null
          preferred_workout_time?: string | null
          profile_image_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          allergies?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          experience_level?: string | null
          first_name?: string | null
          fitness_goals?: string[] | null
          gender?: string | null
          health_conditions?: string | null
          height?: number | null
          id?: string
          last_name?: string | null
          physical_limitations?: string | null
          preferred_workout_time?: string | null
          profile_image_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
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
      expire_old_invitations: { Args: never; Returns: undefined }
      generate_expiring_program_notifications: {
        Args: never
        Returns: undefined
      }
      generate_trainer_slug: { Args: { trainer_name: string }; Returns: string }
      get_user_age: { Args: { birth_date: string }; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      initialize_default_email_templates: {
        Args: { gym_user_id: string }
        Returns: undefined
      }
      is_mkt_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "client" | "trainer" | "gym" | "studio" | "admin"
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
      app_role: ["client", "trainer", "gym", "studio", "admin"],
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
