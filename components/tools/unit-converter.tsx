"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UnitDef {
  label: string
  perBase: number // multiply value-in-this-unit by perBase to get base unit value
}

interface Category {
  label: string
  baseLabel: string
  units: Record<string, UnitDef>
}

const CATEGORIES: Record<string, Category> = {
  compute: {
    label: "Compute throughput (FLOPS)",
    baseLabel: "FLOPS",
    units: {
      FLOPS: { label: "FLOPS", perBase: 1 },
      KFLOPS: { label: "KFLOPS", perBase: 1e3 },
      MFLOPS: { label: "MFLOPS", perBase: 1e6 },
      GFLOPS: { label: "GFLOPS", perBase: 1e9 },
      TFLOPS: { label: "TFLOPS", perBase: 1e12 },
      PFLOPS: { label: "PFLOPS", perBase: 1e15 },
    },
  },
  bandwidth: {
    label: "Memory bandwidth (bytes/s, decimal)",
    baseLabel: "B/s",
    units: {
      "B/s": { label: "B/s", perBase: 1 },
      "KB/s": { label: "KB/s", perBase: 1e3 },
      "MB/s": { label: "MB/s", perBase: 1e6 },
      "GB/s": { label: "GB/s", perBase: 1e9 },
      "TB/s": { label: "TB/s", perBase: 1e12 },
    },
  },
  storage: {
    label: "Data size (bytes)",
    baseLabel: "bytes",
    units: {
      B: { label: "B", perBase: 1 },
      KB: { label: "KB (1000)", perBase: 1e3 },
      MB: { label: "MB (1000^2)", perBase: 1e6 },
      GB: { label: "GB (1000^3)", perBase: 1e9 },
      TB: { label: "TB (1000^4)", perBase: 1e12 },
      KiB: { label: "KiB (1024)", perBase: 1024 },
      MiB: { label: "MiB (1024^2)", perBase: 1024 ** 2 },
      GiB: { label: "GiB (1024^3)", perBase: 1024 ** 3 },
      TiB: { label: "TiB (1024^4)", perBase: 1024 ** 4 },
    },
  },
}

function formatNumber(n: number): string {
  if (!isFinite(n)) return "-"
  if (n === 0) return "0"
  if (Math.abs(n) < 1e-3 || Math.abs(n) >= 1e15) return n.toExponential(4)
  return n.toLocaleString(undefined, { maximumFractionDigits: 6 })
}

export function UnitConverter() {
  const [categoryKey, setCategoryKey] = useState<keyof typeof CATEGORIES>("compute")
  const [unitKey, setUnitKey] = useState("GFLOPS")
  const [value, setValue] = useState("1")

  const category = CATEGORIES[categoryKey]

  const handleCategoryChange = (key: string) => {
    setCategoryKey(key as keyof typeof CATEGORIES)
    setUnitKey(Object.keys(CATEGORIES[key as keyof typeof CATEGORIES].units)[0])
  }

  const baseValue = useMemo(() => {
    const numeric = Number(value)
    if (Number.isNaN(numeric)) return null
    return numeric * category.units[unitKey].perBase
  }, [value, unitKey, category])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unit Converter</CardTitle>
        <CardDescription>Convert between compute, bandwidth, and data-size units common in HPC/ML work</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label>Category</Label>
            <Select value={categoryKey} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CATEGORIES).map(([key, c]) => (
                  <SelectItem key={key} value={key}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Value</Label>
            <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label>Unit</Label>
            <Select value={unitKey} onValueChange={setUnitKey}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(category.units).map(([key, u]) => (
                  <SelectItem key={key} value={key}>
                    {u.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {baseValue !== null && (
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(category.units).map(([key, u]) => (
                  <tr key={key} className="border-b last:border-0">
                    <td className="px-3 py-2 text-muted-foreground">{u.label}</td>
                    <td className="px-3 py-2 text-right font-mono">{formatNumber(baseValue / u.perBase)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
