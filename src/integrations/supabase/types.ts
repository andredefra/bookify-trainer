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
          created_at: string
          end_datetime: string
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
          created_at?: string
          end_datetime: string
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
          created_at?: string
          end_datetime?: string
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
