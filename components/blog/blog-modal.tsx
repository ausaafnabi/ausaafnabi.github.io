"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn, formatDate } from "@/lib/utils"
import type { BlogPost } from "@/lib/blog-data"

interface BlogModalProps {
  blog: BlogPost | null
  isOpen: boolean
  onClose: () => void
}

export function BlogModal({ blog, isOpen, onClose }: BlogModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  if (!blog) return null

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full sm:w-3/4 lg:w-2/3 bg-background shadow-xl transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Blog Post</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>

          <div className="relative aspect-video w-full bg-muted">
            <img src={blog.thumbnail || "/placeholder.svg"} alt={blog.title} className="h-full w-full object-cover" />
          </div>

          <div className="px-6 py-4 border-b">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatDate(blog.updatedAt)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="max-w-3xl mx-auto prose prose-invert">
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(blog.content) }} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  )
}

// Simple markdown renderer function
function renderMarkdown(markdown: string): string {
  // This is a very basic markdown renderer
  // In a production app, you'd use a proper markdown library
  return markdown
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-6 mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-5 mb-3">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n- (.*)/g, '<ul class="list-disc pl-5 my-3"><li>$1</li></ul>')
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>$1</code></pre>')
    .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
    .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-primary hover:underline" target="_blank">$1</a>')
    .replace(/\n/g, "<br />")
}
