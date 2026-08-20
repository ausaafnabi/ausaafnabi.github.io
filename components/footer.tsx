import { Github, Linkedin, Mail } from "lucide-react"
import { personalData } from "@/lib/data"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {personalData.name}. All rights reserved.
          </p>
          {/* <p className="text-xs text-muted-foreground">Built with Next.js, Tailwind CSS, and shadcn/ui</p> */}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${personalData.email}`}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
          {personalData.social.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={item.name}
            >
              {item.name === "GitHub" ? (
                <Github className="h-5 w-5" />
              ) : item.name === "LinkedIn" ? (
                <Linkedin className="h-5 w-5" />
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
