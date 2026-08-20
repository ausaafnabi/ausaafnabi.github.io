"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { blogPosts, type BlogPost } from "@/lib/blog-data"
import { BlogModal } from "@/components/blog/blog-modal"
import { formatDate } from "@/lib/utils"

export function BlogSection() {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  const handleViewBlog = (blog: BlogPost) => {
    setSelectedBlog(blog)
    setIsViewerOpen(true)
  }

  return (
    <section id="blog" className="scroll-mt-16 animate-fade-in">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blog</h2>
          <p className="text-muted-foreground">Thoughts, tutorials, and insights</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((blog) => (
            <Card
              key={blog.id}
              className="overflow-hidden transition-all hover:shadow-md cursor-pointer group"
              onClick={() => handleViewBlog(blog)}
            >
              <div className="aspect-video w-full bg-muted overflow-hidden">
                <img
                  src={blog.thumbnail || "/placeholder.svg"}
                  alt={blog.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{blog.title}</CardTitle>
                <CardDescription className="flex items-center gap-1 text-xs">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(blog.publishedAt)}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{blog.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {blog.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{blog.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="ml-auto">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <BlogModal blog={selectedBlog} isOpen={isViewerOpen} onClose={() => setIsViewerOpen(false)} />
    </section>
  )
}
