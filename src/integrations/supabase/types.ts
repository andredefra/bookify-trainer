export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
      leads: {
        Row: {
          conversion_date: string | null
          created_at: string
          email: string | null
          first_contact_date: string | null
          id: string
          last_activity_date: string | null
          name: string
          notes: string | null
          phone: string | null
          source: string | null
          status: string | null
          trainer_id: string
          updated_at: string
        }
        Insert: {
          conversion_date?: string | null
          created_at?: string
          email?: string | null
          first_contact_date?: string | null
          id?: string
          last_activity_date?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          trainer_id: string
          updated_at?: string
        }
        Update: {
          conversion_date?: string | null
          created_at?: string
          email?: string | null
          first_contact_date?: string | null
          id?: string
          last_activity_date?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          status?: string | null
          trainer_id?: string
          updated_at?: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
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
      package_type: "sessions_only" | "program_only" | "hybrid" | "service"
      payment_method: "cash" | "stripe" | "installments"
      payment_status: "pending" | "paid" | "overdue" | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
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
      package_type: ["sessions_only", "program_only", "hybrid", "service"],
      payment_method: ["cash", "stripe", "installments"],
      payment_status: ["pending", "paid", "overdue", "cancelled"],
    },
  },
} as const
