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
      assessment_conditions: {
        Row: {
          assessment_id: string
          condition_id: string
          confidence_score: number | null
          created_at: string | null
          id: string
        }
        Insert: {
          assessment_id: string
          condition_id: string
          confidence_score?: number | null
          created_at?: string | null
          id?: string
        }
        Update: {
          assessment_id?: string
          condition_id?: string
          confidence_score?: number | null
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_conditions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "symptom_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assessment_conditions_condition_id_fkey"
            columns: ["condition_id"]
            isOneToOne: false
            referencedRelation: "icd10_conditions"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author: string | null
          category: string
          category_label: string
          content: string
          created_at: string
          excerpt: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          meta_description: string | null
          meta_title: string | null
          published: boolean | null
          published_at: string | null
          reading_time: number | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author?: string | null
          category: string
          category_label: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean | null
          published_at?: string | null
          reading_time?: number | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string | null
          category?: string
          category_label?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          metadata: Json | null
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ebook_downloads: {
        Row: {
          consent_given: boolean
          consent_timestamp: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          ip_address: unknown | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          consent_given?: boolean
          consent_timestamp?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          ip_address?: unknown | null
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          consent_given?: boolean
          consent_timestamp?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          ip_address?: unknown | null
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      icd10_conditions: {
        Row: {
          category: string | null
          code: string
          created_at: string | null
          description: string | null
          id: string
          severity: Database["public"]["Enums"]["severity_level"] | null
          symptoms: string[] | null
          title: string
        }
        Insert: {
          category?: string | null
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          severity?: Database["public"]["Enums"]["severity_level"] | null
          symptoms?: string[] | null
          title: string
        }
        Update: {
          category?: string | null
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          severity?: Database["public"]["Enums"]["severity_level"] | null
          symptoms?: string[] | null
          title?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          confirmation_token: string | null
          confirmed_at: string | null
          consent_given: boolean | null
          consent_timestamp: string | null
          created_at: string
          email: string
          id: string
          ip_address: unknown | null
          is_active: boolean
          subscribed_at: string
          unsubscribe_token: string
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          confirmation_token?: string | null
          confirmed_at?: string | null
          consent_given?: boolean | null
          consent_timestamp?: string | null
          created_at?: string
          email: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean
          subscribed_at?: string
          unsubscribe_token?: string
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          confirmation_token?: string | null
          confirmed_at?: string | null
          consent_given?: boolean | null
          consent_timestamp?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_address?: unknown | null
          is_active?: boolean
          subscribed_at?: string
          unsubscribe_token?: string
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          is_admin: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          is_admin?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          is_admin?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      symptom_assessments: {
        Row: {
          assessment_data: Json | null
          created_at: string | null
          id: string
          identified_symptoms: string[] | null
          session_id: string
        }
        Insert: {
          assessment_data?: Json | null
          created_at?: string | null
          id?: string
          identified_symptoms?: string[] | null
          session_id: string
        }
        Update: {
          assessment_data?: Json | null
          created_at?: string | null
          id?: string
          identified_symptoms?: string[] | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "symptom_assessments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      glossary_terms: {
        Row: {
          id: string
          term: string
          slug: string
          definition: string
          teaser: string | null
          alias: string | null
          tags: string[] | null
          meta_title: string | null
          meta_description: string | null
          is_published: boolean | null
          view_count: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          term: string
          slug: string
          definition: string
          teaser?: string | null
          alias?: string | null
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
          is_published?: boolean | null
          view_count?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          term?: string
          slug?: string
          definition?: string
          teaser?: string | null
          alias?: string | null
          tags?: string[] | null
          meta_title?: string | null
          meta_description?: string | null
          is_published?: boolean | null
          view_count?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      glossary_sections: {
        Row: {
          id: string
          term_id: string
          title: string
          content: string
          section_type: string | null
          sort_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          term_id: string
          title: string
          content: string
          section_type?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          term_id?: string
          title?: string
          content?: string
          section_type?: string | null
          sort_order?: number | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "glossary_sections_term_id_fkey"
            columns: ["term_id"]
            isOneToOne: false
            referencedRelation: "glossary_terms"
            referencedColumns: ["id"]
          },
        ]
      }
      glossary_references: {
        Row: {
          id: string
          term_id: string
          reference_text: string
          url: string | null
          sort_order: number | null
        }
        Insert: {
          id?: string
          term_id: string
          reference_text: string
          url?: string | null
          sort_order?: number | null
        }
        Update: {
          id?: string
          term_id?: string
          reference_text?: string
          url?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "glossary_references_term_id_fkey"
            columns: ["term_id"]
            isOneToOne: false
            referencedRelation: "glossary_terms"
            referencedColumns: ["id"]
          },
        ]
      }
      glossary_related_terms: {
        Row: {
          term_id: string
          related_term_id: string
        }
        Insert: {
          term_id: string
          related_term_id: string
        }
        Update: {
          term_id?: string
          related_term_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "glossary_related_terms_term_id_fkey"
            columns: ["term_id"]
            isOneToOne: false
            referencedRelation: "glossary_terms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "glossary_related_terms_related_term_id_fkey"
            columns: ["related_term_id"]
            isOneToOne: false
            referencedRelation: "glossary_terms"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          short_description: string | null
          image_url: string | null
          price: number | null
          is_published: boolean | null
          is_free: boolean | null
          difficulty_level: Database["public"]["Enums"]["difficulty_level"] | null
          estimated_duration_minutes: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          short_description?: string | null
          image_url?: string | null
          price?: number | null
          is_published?: boolean | null
          is_free?: boolean | null
          difficulty_level?: Database["public"]["Enums"]["difficulty_level"] | null
          estimated_duration_minutes?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          image_url?: string | null
          price?: number | null
          is_published?: boolean | null
          is_free?: boolean | null
          difficulty_level?: Database["public"]["Enums"]["difficulty_level"] | null
          estimated_duration_minutes?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      course_lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          slug: string
          content: string | null
          video_url: string | null
          sort_order: number | null
          is_preview: boolean | null
          is_published: boolean | null
          duration_minutes: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          slug: string
          content?: string | null
          video_url?: string | null
          sort_order?: number | null
          is_preview?: boolean | null
          is_published?: boolean | null
          duration_minutes?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          slug?: string
          content?: string | null
          video_url?: string | null
          sort_order?: number | null
          is_preview?: boolean | null
          is_published?: boolean | null
          duration_minutes?: number | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          id: string
          user_id: string
          course_id: string
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          started_at: string | null
          completed_at: string | null
          enrolled_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          started_at?: string | null
          completed_at?: string | null
          enrolled_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          started_at?: string | null
          completed_at?: string | null
          enrolled_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          is_completed: boolean | null
          progress_percent: number | null
          completed_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          is_completed?: boolean | null
          progress_percent?: number | null
          completed_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          is_completed?: boolean | null
          progress_percent?: number | null
          completed_at?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "course_lessons"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      increment_glossary_view: {
        Args: { term_slug: string }
        Returns: undefined
      }
    }
    Enums: {
      severity_level: "mild" | "moderate" | "severe"
      difficulty_level: "beginner" | "intermediate" | "advanced"
      payment_status: "pending" | "completed" | "refunded" | "free"
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
      severity_level: ["mild", "moderate", "severe"],
      difficulty_level: ["beginner", "intermediate", "advanced"],
      payment_status: ["pending", "completed", "refunded", "free"],
    },
  },
} as const
