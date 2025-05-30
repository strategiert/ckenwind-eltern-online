
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { blogService, type BlogPostInsert, type BlogPostUpdate } from "@/services/blogService";
import { useToast } from "@/hooks/use-toast";

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: blogService.getPublishedPosts,
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => blogService.getPublishedPostBySlug(slug),
    enabled: !!slug,
  });
};

export const useBlogPostsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["blog-posts", "category", category],
    queryFn: () => blogService.getPublishedPostsByCategory(category),
    enabled: !!category,
  });
};

export const useFeaturedPosts = () => {
  return useQuery({
    queryKey: ["featured-posts"],
    queryFn: blogService.getFeaturedPosts,
  });
};

// Admin hooks
export const useAllBlogPosts = () => {
  return useQuery({
    queryKey: ["all-blog-posts"],
    queryFn: blogService.getAllPosts,
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (post: BlogPostInsert) => blogService.createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["all-blog-posts"] });
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create blog post",
        variant: "destructive",
      });
      console.error("Error creating blog post:", error);
    },
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: BlogPostUpdate }) =>
      blogService.updatePost(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["all-blog-posts"] });
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
      console.error("Error updating blog post:", error);
    },
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => blogService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["all-blog-posts"] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
      console.error("Error deleting blog post:", error);
    },
  });
};
