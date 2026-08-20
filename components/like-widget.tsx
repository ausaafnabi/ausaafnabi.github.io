"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

interface Supporter {
  id: string
  name: string
  created_at: string
}

const COLORS = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
]

function colorFor(id: string) {
  const index = id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return COLORS[index % COLORS.length]
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

export function LikeWidget() {
  const [name, setName] = useState("")
  const [website, setWebsite] = useState("") // honeypot, kept empty by real users
  const [supporters, setSupporters] = useState<Supporter[]>([])
  const [isLiking, setIsLiking] = useState(false)

  useEffect(() => {
    if (!supabase) return

    supabase
      .from("supporters")
      .select("id, name, created_at")
      .order("created_at", { ascending: false })
      .limit(30)
      .then(({ data, error }) => {
        if (!error && data) setSupporters(data)
      })
  }, [])

  const handleLike = async () => {
    if (!name.trim() || !supabase) return

    if (website) {
      // Honeypot field was filled in by a bot; silently drop the submission.
      setName("")
      return
    }

    setIsLiking(true)

    const { data, error } = await supabase
      .from("supporters")
      .insert({ name: name.trim() })
      .select("id, name, created_at")
      .single()

    if (error) {
      toast({
        title: "Couldn't add your like",
        description: error.message.includes("already liked")
          ? "You already liked this recently."
          : "Please try again in a moment.",
        variant: "destructive",
      })
    } else if (data) {
      setSupporters((prev) => [data, ...prev])
      setName("")
    }

    setTimeout(() => setIsLiking(false), 800)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Show Your Support</CardTitle>
        <CardDescription>Leave your name and like this portfolio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLike()}
            disabled={isLiking}
          />
          <input
            type="text"
            name="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <Button
            onClick={handleLike}
            disabled={!name.trim() || isLiking || !supabase}
            className={cn("transition-all", isLiking && "animate-pulse bg-red-500 hover:bg-red-600")}
          >
            <Heart className={cn("mr-2 h-4 w-4", isLiking && "animate-ping fill-white")} />
            Like
          </Button>
        </div>

        {supporters.length > 0 && (
          <div className="pt-4">
            <h4 className="text-sm font-medium mb-3">Recent Supporters</h4>
            <div className="flex flex-wrap gap-2">
              {supporters.map((supporter) => (
                <div
                  key={supporter.id}
                  className="flex items-center gap-2 bg-muted rounded-full pl-1 pr-3 py-1"
                  title={`${supporter.name} liked this portfolio`}
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className={colorFor(supporter.id)}>{getInitials(supporter.name)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{supporter.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
