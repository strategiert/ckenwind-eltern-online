import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

export type BlogPost = Tables<"blog_posts">;
export type BlogPostInsert = TablesInsert<"blog_posts">;
export type BlogPostUpdate = TablesUpdate<"blog_posts">;

export const blogService = {
  // Get all published blog posts
  async getPublishedPosts() {
    console.log("Fetching published blog posts...");
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Error fetching published posts:", error);
      throw error;
    }
    console.log("Fetched published posts:", data?.length || 0, "posts");
    return data;
  },

  // Get a single published post by slug
  async getPublishedPostBySlug(slug: string) {
    console.log("Fetching blog post by slug:", slug);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error) {
      console.error("Error fetching post by slug:", error);
      throw error;
    }
    if (!data) {
      console.warn("No blog post found for slug:", slug);
    } else {
      console.log("Fetched post:", data?.title);
    }
    return data;
  },

  // Get posts by category
  async getPublishedPostsByCategory(category: string) {
    console.log("Fetching posts by category:", category);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("category", category)
      .eq("published", true)
      .order("published_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching posts by category:", error);
      throw error;
    }
    console.log("Fetched posts for category:", data?.length || 0, "posts");
    return data;
  },

  // Get featured posts
  async getFeaturedPosts() {
    console.log("Fetching featured posts...");
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("published_at", { ascending: false });
    
    if (error) {
      console.error("Error fetching featured posts:", error);
      throw error;
    }
    console.log("Fetched featured posts:", data?.length || 0, "posts");
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
