"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const SAMPLE = `{"name":"Ausaaf Nabi","role":"Senior Software Engineer","skills":["CUDA","Distributed Systems","ML"]}`

function locateError(input: string, message: string): string | null {
  const positionMatch = message.match(/position (\d+)/)
  if (!positionMatch) return null
  const position = Number(positionMatch[1])
  const upToError = input.slice(0, position)
  const line = upToError.split("\n").length
  const column = position - upToError.lastIndexOf("\n")
  return `line ${line}, column ${column}`
}

export function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE)
  const [copied, setCopied] = useState(false)

  const { formatted, error, byteSize } = useMemo(() => {
    if (!input.trim()) return { formatted: "", error: null, byteSize: 0 }
    try {
      const parsed = JSON.parse(input)
      const pretty = JSON.stringify(parsed, null, 2)
      return { formatted: pretty, error: null, byteSize: new Blob([input]).size }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Invalid JSON"
      const location = locateError(input, message)
      return { formatted: "", error: location ? `${message} (${location})` : message, byteSize: 0 }
    }
  }, [input])

  const minify = () => {
    try {
      setInput(JSON.stringify(JSON.parse(input)))
    } catch {
      // leave input as-is if invalid
    }
  }

  const handleCopy = async () => {
    if (!formatted) return
    await navigator.clipboard.writeText(formatted)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>Paste JSON to validate and format</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[320px] font-mono text-sm"
            spellCheck={false}
          />
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="outline" onClick={minify}>
              Minify
            </Button>
            <Button size="sm" variant="outline" onClick={() => setInput(SAMPLE)}>
              Load sample
            </Button>
            {error ? (
              <Badge variant="destructive">Invalid</Badge>
            ) : input.trim() ? (
              <Badge>Valid ({byteSize} bytes)</Badge>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Formatted output</CardTitle>
          <CardDescription>{error ? "Fix the error to see formatted output" : "Pretty-printed, 2-space indent"}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {error ? (
            <div className="min-h-[320px] rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          ) : (
            <pre className="min-h-[320px] overflow-auto rounded-md border bg-muted/30 p-3 font-mono text-sm">
              {formatted || "// Output will appear here"}
            </pre>
          )}
          <Button size="sm" variant="outline" onClick={handleCopy} disabled={!formatted}>
            {copied ? "Copied!" : "Copy output"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
