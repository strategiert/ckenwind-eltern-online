
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BlogBreadcrumbProps {
  title?: string;
  category?: string;
  categoryLabel?: string;
}

const BlogBreadcrumb: React.FC<BlogBreadcrumbProps> = ({ title, category, categoryLabel }) => {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/blog">Blog</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {category && categoryLabel && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/blog?category=${category}`}>{categoryLabel}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
        {title && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BlogBreadcrumb;
