
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type BlogPost = Tables<"blog_posts">;
export type BlogPostInsert = TablesInsert<"blog_posts">;
export type BlogPostUpdate = TablesUpdate<"blog_posts">;

export const blogService = {
  // Get all published blog posts
  async getPublishedPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get a single published post by slug
  async getPublishedPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get posts by category
  async getPublishedPostsByCategory(category: string) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("category", category)
      .eq("published", true)
      .order("published_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get featured posts
  async getFeaturedPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("published_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Admin functions (will require authentication later)
  async getAllPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createPost(post: BlogPostInsert) {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert(post)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updatePost(id: string, updates: BlogPostUpdate) {
    const { data, error } = await supabase
      .from("blog_posts")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deletePost(id: string) {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
  }
};
