"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

const FLAG_OPTIONS = [
  { flag: "g", label: "global" },
  { flag: "i", label: "case-insensitive" },
  { flag: "m", label: "multiline" },
  { flag: "s", label: "dotAll" },
]

export function RegexTester() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b")
  const [flags, setFlags] = useState("g")
  const [testString, setTestString] = useState(
    "Contact me at nabiausaaf@gmail.com or the backup address hello@example.com.",
  )

  const toggleFlag = (flag: string) => {
    setFlags((prev) => (prev.includes(flag) ? prev.replace(flag, "") : prev + flag))
  }

  const { regex, error } = useMemo(() => {
    if (!pattern) return { regex: null, error: null }
    try {
      return { regex: new RegExp(pattern, flags), error: null }
    } catch (e) {
      return { regex: null, error: e instanceof Error ? e.message : "Invalid pattern" }
    }
  }, [pattern, flags])

  const matches = useMemo(() => {
    if (!regex || !testString) return []
    try {
      return Array.from(testString.matchAll(new RegExp(regex.source, regex.flags.includes("g") ? regex.flags : regex.flags + "g")))
    } catch {
      return []
    }
  }, [regex, testString])

  const highlighted = useMemo(() => {
    if (!matches.length) return null
    const parts: { text: string; isMatch: boolean }[] = []
    let lastIndex = 0
    for (const match of matches) {
      if (match.index === undefined) continue
      if (match.index > lastIndex) parts.push({ text: testString.slice(lastIndex, match.index), isMatch: false })
      parts.push({ text: match[0], isMatch: true })
      lastIndex = match.index + match[0].length
    }
    if (lastIndex < testString.length) parts.push({ text: testString.slice(lastIndex), isMatch: false })
    return parts
  }, [matches, testString])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Regex Tester</CardTitle>
          <CardDescription>Test a pattern against sample text with live match highlighting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="pattern">Pattern</Label>
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-muted-foreground">/</span>
              <Input
                id="pattern"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="font-mono"
                placeholder="\\d+"
              />
              <span className="text-muted-foreground">/{flags}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {FLAG_OPTIONS.map(({ flag, label }) => (
              <Badge
                key={flag}
                variant={flags.includes(flag) ? "default" : "outline"}
                className="cursor-pointer select-none"
                onClick={() => toggleFlag(flag)}
              >
                {flag} - {label}
              </Badge>
            ))}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="space-y-1.5">
            <Label htmlFor="test-string">Test string</Label>
            <Textarea
              id="test-string"
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="min-h-[120px] font-mono text-sm"
            />
          </div>

          {highlighted && (
            <div className="space-y-1.5">
              <Label>Preview</Label>
              <div className="rounded-md border bg-muted/30 p-3 font-mono text-sm whitespace-pre-wrap break-words">
                {highlighted.map((part, i) =>
                  part.isMatch ? (
                    <mark key={i} className="bg-primary/30 text-foreground rounded px-0.5">
                      {part.text}
                    </mark>
                  ) : (
                    <span key={i}>{part.text}</span>
                  ),
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Matches ({matches.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {matches.length === 0 ? (
            <p className="text-sm text-muted-foreground">No matches yet.</p>
          ) : (
            <div className="space-y-2">
              {matches.map((match, i) => (
                <div key={i} className="rounded-md border p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-mono">{match[0]}</span>
                    <Badge variant="outline">index {match.index}</Badge>
                  </div>
                  {match.length > 1 && (
                    <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                      {match.slice(1).map((group, gi) => (
                        <div key={gi}>
                          group {gi + 1}: <span className="font-mono">{group ?? "(undefined)"}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
