"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Code, Github, Layers, Mail, User, BookOpen, Braces, Cpu } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { personalData } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ChatButton } from "@/components/chat/chat-button"
import { Footer } from "@/components/footer"

interface PortfolioLayoutProps {
  children: React.ReactNode
}

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
  const [activeSection, setActiveSection] = useState("about")

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 200

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Create a base path for assets that works with GitHub Pages
  const getBasePath = () => {
    // This will be replaced with your actual repo name if using a custom domain
    // For username.github.io sites, this can be empty
    return process.env.NODE_ENV === "production" ? "" : ""
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar variant="inset" className="border-r border-border/50">
          <SidebarHeader className="flex flex-col gap-0 py-4">
            <div className="flex items-center px-4">
              <div className="flex items-center gap-2 text-xl font-bold">
                <Code className="h-6 w-6" />
                <span>{personalData.name}</span>
              </div>
              <div className="ml-auto">
                <ModeToggle />
              </div>
            </div>
            <div className="px-4 py-2">
              <p className="text-sm text-muted-foreground">{personalData.title}</p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeSection === "about"} onClick={() => scrollToSection("about")}>
                      <User className="h-4 w-4" />
                      <span>About</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={activeSection === "skills"} onClick={() => scrollToSection("skills")}>
                      <Layers className="h-4 w-4" />
                      <span>Skills</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeSection === "projects"}
                      onClick={() => scrollToSection("projects")}
                    >
                      <Github className="h-4 w-4" />
                      <span>Projects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeSection === "publications"}
                      onClick={() => scrollToSection("publications")}
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>Publications</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={activeSection === "contact"}
                      onClick={() => scrollToSection("contact")}
                    >
                      <Mail className="h-4 w-4" />
                      <span>Contact</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Tools</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/tools/regex-json/">
                        <Braces className="h-4 w-4" />
                        <span>Regex & JSON</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/tools/cuda/">
                        <Cpu className="h-4 w-4" />
                        <span>CUDA Toolbox</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Social</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {personalData.social.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton asChild>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <span>{item.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <Button asChild className="w-full">
              <a href={`${getBasePath()}/resume.pdf`} target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </Button>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="bg-background flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border/50 bg-background/95 px-6 backdrop-blur">
            <SidebarTrigger />
            <div className="flex items-center text-sm font-medium">
              <span className="hidden md:inline-block">Portfolio Documentation</span>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="container max-w-4xl py-6 md:py-12">{children}</div>
          </main>
          <Footer />
        </SidebarInset>
      </div>

      <ChatButton />
    </SidebarProvider>
  )
}
