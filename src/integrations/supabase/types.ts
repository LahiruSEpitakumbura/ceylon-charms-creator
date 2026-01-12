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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      customer_profiles: {
        Row: {
          country: string | null
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          preferred_language: string | null
          travel_preferences: string[] | null
          updated_at: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          preferred_language?: string | null
          travel_preferences?: string[] | null
          updated_at?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          preferred_language?: string | null
          travel_preferences?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      driver_profiles: {
        Row: {
          created_at: string
          email: string
          experience_years: number
          id: string
          languages: string[] | null
          license_expiry: string | null
          license_number: string
          max_passengers: number
          name: string
          phone: string
          photo_url: string | null
          price_per_day: number
          status: Database["public"]["Enums"]["provider_status"]
          updated_at: string
          vehicle_model: string | null
          vehicle_photo_url: string | null
          vehicle_plate: string | null
          vehicle_type: string
          vehicle_year: number | null
        }
        Insert: {
          created_at?: string
          email: string
          experience_years?: number
          id?: string
          languages?: string[] | null
          license_expiry?: string | null
          license_number: string
          max_passengers?: number
          name: string
          phone: string
          photo_url?: string | null
          price_per_day?: number
          status?: Database["public"]["Enums"]["provider_status"]
          updated_at?: string
          vehicle_model?: string | null
          vehicle_photo_url?: string | null
          vehicle_plate?: string | null
          vehicle_type: string
          vehicle_year?: number | null
        }
        Update: {
          created_at?: string
          email?: string
          experience_years?: number
          id?: string
          languages?: string[] | null
          license_expiry?: string | null
          license_number?: string
          max_passengers?: number
          name?: string
          phone?: string
          photo_url?: string | null
          price_per_day?: number
          status?: Database["public"]["Enums"]["provider_status"]
          updated_at?: string
          vehicle_model?: string | null
          vehicle_photo_url?: string | null
          vehicle_plate?: string | null
          vehicle_type?: string
          vehicle_year?: number | null
        }
        Relationships: []
      }
      guide_profiles: {
        Row: {
          bio: string | null
          created_at: string
          email: string
          experience_years: number
          id: string
          languages: string[]
          license_number: string | null
          name: string
          phone: string
          photo_url: string | null
          price_per_day: number
          specializations: string[] | null
          status: Database["public"]["Enums"]["provider_status"]
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email: string
          experience_years?: number
          id?: string
          languages?: string[]
          license_number?: string | null
          name: string
          phone: string
          photo_url?: string | null
          price_per_day?: number
          specializations?: string[] | null
          status?: Database["public"]["Enums"]["provider_status"]
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string
          experience_years?: number
          id?: string
          languages?: string[]
          license_number?: string | null
          name?: string
          phone?: string
          photo_url?: string | null
          price_per_day?: number
          specializations?: string[] | null
          status?: Database["public"]["Enums"]["provider_status"]
          updated_at?: string
        }
        Relationships: []
      }
      hotel_profiles: {
        Row: {
          address: string
          amenities: string[] | null
          city: string
          created_at: string
          description: string | null
          email: string
          id: string
          name: string
          phone: string
          photo_urls: string[] | null
          price_range_max: number
          price_range_min: number
          room_types: string[] | null
          star_rating: number
          status: Database["public"]["Enums"]["provider_status"]
          updated_at: string
          website: string | null
        }
        Insert: {
          address: string
          amenities?: string[] | null
          city: string
          created_at?: string
          description?: string | null
          email: string
          id?: string
          name: string
          phone: string
          photo_urls?: string[] | null
          price_range_max?: number
          price_range_min?: number
          room_types?: string[] | null
          star_rating?: number
          status?: Database["public"]["Enums"]["provider_status"]
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string
          amenities?: string[] | null
          city?: string
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string
          photo_urls?: string[] | null
          price_range_max?: number
          price_range_min?: number
          room_types?: string[] | null
          star_rating?: number
          status?: Database["public"]["Enums"]["provider_status"]
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      payment_info: {
        Row: {
          account_name: string | null
          account_number: string | null
          bank_name: string | null
          booking_id: string
          created_at: string
          id: string
          instructions: string | null
          payment_method: string
        }
        Insert: {
          account_name?: string | null
          account_number?: string | null
          bank_name?: string | null
          booking_id: string
          created_at?: string
          id?: string
          instructions?: string | null
          payment_method: string
        }
        Update: {
          account_name?: string | null
          account_number?: string | null
          bank_name?: string | null
          booking_id?: string
          created_at?: string
          id?: string
          instructions?: string | null
          payment_method?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_info_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "tour_bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_bookings: {
        Row: {
          booking_reference: string
          created_at: string
          customer_email: string
          customer_id: string | null
          customer_name: string
          customer_phone: string
          destinations: string[] | null
          driver_id: string | null
          end_date: string
          guide_id: string | null
          id: string
          num_passengers: number
          payment_status: string | null
          special_requests: string | null
          start_date: string
          status: Database["public"]["Enums"]["booking_status"]
          total_amount: number
          updated_at: string
          vehicle_type: string | null
        }
        Insert: {
          booking_reference: string
          created_at?: string
          customer_email: string
          customer_id?: string | null
          customer_name: string
          customer_phone: string
          destinations?: string[] | null
          driver_id?: string | null
          end_date: string
          guide_id?: string | null
          id?: string
          num_passengers?: number
          payment_status?: string | null
          special_requests?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number
          updated_at?: string
          vehicle_type?: string | null
        }
        Update: {
          booking_reference?: string
          created_at?: string
          customer_email?: string
          customer_id?: string | null
          customer_name?: string
          customer_phone?: string
          destinations?: string[] | null
          driver_id?: string | null
          end_date?: string
          guide_id?: string | null
          id?: string
          num_passengers?: number
          payment_status?: string | null
          special_requests?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number
          updated_at?: string
          vehicle_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tour_bookings_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tour_bookings_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "driver_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tour_bookings_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guide_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_tracking: {
        Row: {
          booking_id: string
          created_at: string
          current_day: number | null
          current_location_lat: number | null
          current_location_lng: number | null
          current_location_name: string | null
          id: string
          last_location_update: string | null
          notes: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          booking_id: string
          created_at?: string
          current_day?: number | null
          current_location_lat?: number | null
          current_location_lng?: number | null
          current_location_name?: string | null
          id?: string
          last_location_update?: string | null
          notes?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          booking_id?: string
          created_at?: string
          current_day?: number | null
          current_location_lat?: number | null
          current_location_lng?: number | null
          current_location_name?: string | null
          id?: string
          last_location_update?: string | null
          notes?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_tracking_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "tour_bookings"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
      provider_status: "pending" | "approved" | "rejected"
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
      booking_status: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
      ],
      provider_status: ["pending", "approved", "rejected"],
    },
  },
} as const
