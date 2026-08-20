"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const DTYPES: Record<string, { label: string; bytes: number }> = {
  fp64: { label: "float64 (8 bytes)", bytes: 8 },
  fp32: { label: "float32 (4 bytes)", bytes: 4 },
  fp16: { label: "float16 / bf16 (2 bytes)", bytes: 2 },
  int8: { label: "int8 (1 byte)", bytes: 1 },
  int4: { label: "int4 (0.5 bytes)", bytes: 0.5 },
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B"
  const units = ["B", "KB", "MB", "GB", "TB"]
  const exponent = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)))
  const value = bytes / Math.pow(1024, exponent)
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${units[exponent]}`
}

export function TensorSizeCalculator() {
  const [shape, setShape] = useState("32, 512, 4096")
  const [dtype, setDtype] = useState<keyof typeof DTYPES>("fp16")

  const result = useMemo(() => {
    const dims = shape
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean)
      .map(Number)

    if (dims.length === 0 || dims.some((d) => !Number.isFinite(d) || d <= 0)) {
      return { error: "Enter comma-separated positive integers, e.g. 32, 512, 4096" }
    }

    const elements = dims.reduce((acc, d) => acc * d, 1)
    const bytes = elements * DTYPES[dtype].bytes
    return { elements, bytes, error: null }
  }, [shape, dtype])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tensor Memory Size</CardTitle>
        <CardDescription>Estimate the memory footprint of a tensor from its shape and dtype</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="shape">Shape (comma-separated dims)</Label>
            <Input id="shape" value={shape} onChange={(e) => setShape(e.target.value)} placeholder="32, 512, 4096" />
          </div>
          <div className="space-y-1.5">
            <Label>Data type</Label>
            <Select value={dtype} onValueChange={(v) => setDtype(v as keyof typeof DTYPES)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(DTYPES).map(([key, d]) => (
                  <SelectItem key={key} value={key}>
                    {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {result.error ? (
          <p className="text-sm text-destructive">{result.error}</p>
        ) : (
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-muted-foreground">Elements</dt>
              <dd className="font-medium">{result.elements!.toLocaleString()}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Memory footprint</dt>
              <dd className="font-medium">{formatBytes(result.bytes!)}</dd>
            </div>
          </dl>
        )}
      </CardContent>
    </Card>
  )
}
