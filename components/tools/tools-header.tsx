"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, Braces, Cpu } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

const TOOLS = [
  { href: "/tools/regex-json/", label: "Regex & JSON", icon: Braces },
  { href: "/tools/cuda/", label: "CUDA Toolbox", icon: Cpu },
]

export function ToolsHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 border-b border-border/50 bg-background/95 backdrop-blur">
      <div className="container flex h-16 max-w-4xl items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Portfolio
        </Link>
        <nav className="ml-4 flex items-center gap-1">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                pathname === tool.href
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
              )}
            >
              <tool.icon className="h-4 w-4" />
              {tool.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
