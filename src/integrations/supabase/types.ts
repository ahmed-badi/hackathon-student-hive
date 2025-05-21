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
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          comments: string | null
          content_rating: number
          created_at: string
          email: string | null
          id: string
          improvement_suggestions: string | null
          logistics_rating: number
          mentorship_rating: number
          name: string | null
          organization_rating: number
          overall_rating: number
        }
        Insert: {
          comments?: string | null
          content_rating: number
          created_at?: string
          email?: string | null
          id?: string
          improvement_suggestions?: string | null
          logistics_rating: number
          mentorship_rating: number
          name?: string | null
          organization_rating: number
          overall_rating: number
        }
        Update: {
          comments?: string | null
          content_rating?: number
          created_at?: string
          email?: string | null
          id?: string
          improvement_suggestions?: string | null
          logistics_rating?: number
          mentorship_rating?: number
          name?: string | null
          organization_rating?: number
          overall_rating?: number
        }
        Relationships: []
      }
      registrations: {
        Row: {
          created_at: string
          email: string
          experience: string
          first_name: string
          graduation_year: string
          id: string
          last_name: string
          major: string
          phone: string
          project_idea: string | null
          resume_url: string | null
          skills: string[]
          specialization: string | null
          team_members: string | null
          team_name: string | null
          team_preference: string
          track: string
          university: string
        }
        Insert: {
          created_at?: string
          email: string
          experience: string
          first_name: string
          graduation_year: string
          id?: string
          last_name: string
          major: string
          phone: string
          project_idea?: string | null
          resume_url?: string | null
          skills?: string[]
          specialization?: string | null
          team_members?: string | null
          team_name?: string | null
          team_preference: string
          track: string
          university: string
        }
        Update: {
          created_at?: string
          email?: string
          experience?: string
          first_name?: string
          graduation_year?: string
          id?: string
          last_name?: string
          major?: string
          phone?: string
          project_idea?: string | null
          resume_url?: string | null
          skills?: string[]
          specialization?: string | null
          team_members?: string | null
          team_name?: string | null
          team_preference?: string
          track?: string
          university?: string
        }
        Relationships: []
      }
      team_submissions: {
        Row: {
          demo_link: string | null
          github_link: string | null
          id: string
          presentation_url: string | null
          project_description: string
          project_title: string
          submitted_at: string
          team_members: string[]
          team_name: string
          track: string
        }
        Insert: {
          demo_link?: string | null
          github_link?: string | null
          id?: string
          presentation_url?: string | null
          project_description: string
          project_title: string
          submitted_at?: string
          team_members: string[]
          team_name: string
          track: string
        }
        Update: {
          demo_link?: string | null
          github_link?: string | null
          id?: string
          presentation_url?: string | null
          project_description?: string
          project_title?: string
          submitted_at?: string
          team_members?: string[]
          team_name?: string
          track?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
