import type React from "react"
import { ToolsHeader } from "@/components/tools/tools-header"
import { Footer } from "@/components/footer"

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ToolsHeader />
      <main className="flex-1">
        <div className="container max-w-4xl py-6 md:py-12">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
