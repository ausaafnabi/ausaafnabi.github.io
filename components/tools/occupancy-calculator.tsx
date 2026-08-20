"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface Preset {
  label: string
  maxWarpsPerSM: number
  maxThreadsPerSM: number
  maxBlocksPerSM: number
  maxRegsPerSM: number
  maxSharedMemPerSM: number // bytes
}

const PRESETS: Record<string, Preset> = {
  "7.5": { label: "7.5 - Turing (RTX 20xx, T4)", maxWarpsPerSM: 32, maxThreadsPerSM: 1024, maxBlocksPerSM: 16, maxRegsPerSM: 65536, maxSharedMemPerSM: 65536 },
  "8.0": { label: "8.0 - Ampere (A100)", maxWarpsPerSM: 64, maxThreadsPerSM: 2048, maxBlocksPerSM: 32, maxRegsPerSM: 65536, maxSharedMemPerSM: 167936 },
  "8.6": { label: "8.6 - Ampere (RTX 30xx)", maxWarpsPerSM: 48, maxThreadsPerSM: 1536, maxBlocksPerSM: 16, maxRegsPerSM: 65536, maxSharedMemPerSM: 102400 },
  "8.9": { label: "8.9 - Ada Lovelace (RTX 40xx)", maxWarpsPerSM: 48, maxThreadsPerSM: 1536, maxBlocksPerSM: 24, maxRegsPerSM: 65536, maxSharedMemPerSM: 102400 },
  "9.0": { label: "9.0 - Hopper (H100)", maxWarpsPerSM: 64, maxThreadsPerSM: 2048, maxBlocksPerSM: 32, maxRegsPerSM: 65536, maxSharedMemPerSM: 233472 },
}

const WARP_SIZE = 32

export function OccupancyCalculator() {
  const [capability, setCapability] = useState<keyof typeof PRESETS>("8.6")
  const [threadsPerBlock, setThreadsPerBlock] = useState(256)
  const [regsPerThread, setRegsPerThread] = useState(32)
  const [sharedMemPerBlock, setSharedMemPerBlock] = useState(0)

  const preset = PRESETS[capability]

  const result = useMemo(() => {
    if (threadsPerBlock <= 0) return null

    const warpsPerBlock = Math.ceil(threadsPerBlock / WARP_SIZE)
    const limitWarps = Math.floor(preset.maxWarpsPerSM / warpsPerBlock)
    const limitBlocks = preset.maxBlocksPerSM
    const limitRegs = regsPerThread > 0 ? Math.floor(preset.maxRegsPerSM / (regsPerThread * threadsPerBlock)) : Infinity
    const limitSharedMem = sharedMemPerBlock > 0 ? Math.floor(preset.maxSharedMemPerSM / sharedMemPerBlock) : Infinity

    const limits = [
      { name: "Warps per SM", value: limitWarps },
      { name: "Blocks per SM (hardware max)", value: limitBlocks },
      { name: "Registers per SM", value: limitRegs },
      { name: "Shared memory per SM", value: limitSharedMem },
    ]

    const activeBlocksPerSM = Math.max(0, Math.min(...limits.map((l) => l.value)))
    const limitingFactor = limits.find((l) => l.value === activeBlocksPerSM)?.name ?? "-"
    const activeWarpsPerSM = activeBlocksPerSM * warpsPerBlock
    const occupancy = Math.min(100, (activeWarpsPerSM / preset.maxWarpsPerSM) * 100)

    return { warpsPerBlock, activeBlocksPerSM, activeWarpsPerSM, occupancy, limitingFactor }
  }, [threadsPerBlock, regsPerThread, sharedMemPerBlock, preset])

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Occupancy Calculator</CardTitle>
          <CardDescription>
            Estimate SM occupancy from kernel launch parameters. Hardware limits are approximate figures from
            NVIDIA's published compute-capability specs - verify against your target GPU for exact tuning.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Compute capability</Label>
            <Select value={capability} onValueChange={(v) => setCapability(v as keyof typeof PRESETS)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PRESETS).map(([key, p]) => (
                  <SelectItem key={key} value={key}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="threads-per-block">Threads per block</Label>
            <Input
              id="threads-per-block"
              type="number"
              min={1}
              max={1024}
              value={threadsPerBlock}
              onChange={(e) => setThreadsPerBlock(Number(e.target.value))}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="regs-per-thread">Registers per thread</Label>
            <Input
              id="regs-per-thread"
              type="number"
              min={0}
              value={regsPerThread}
              onChange={(e) => setRegsPerThread(Number(e.target.value))}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="shared-mem">Shared memory per block (bytes)</Label>
            <Input
              id="shared-mem"
              type="number"
              min={0}
              value={sharedMemPerBlock}
              onChange={(e) => setSharedMemPerBlock(Number(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>Max warps/SM: {preset.maxWarpsPerSM}</div>
            <div>Max threads/SM: {preset.maxThreadsPerSM}</div>
            <div>Max blocks/SM: {preset.maxBlocksPerSM}</div>
            <div>Max shared mem/SM: {(preset.maxSharedMemPerSM / 1024).toFixed(0)} KB</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {result ? (
            <>
              <div className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold">{result.occupancy.toFixed(1)}%</span>
                  <Badge variant="outline">{result.limitingFactor} limited</Badge>
                </div>
                <Progress value={result.occupancy} className="h-3" />
              </div>

              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted-foreground">Warps per block</dt>
                  <dd className="font-medium">{result.warpsPerBlock}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Active blocks per SM</dt>
                  <dd className="font-medium">{result.activeBlocksPerSM}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Active warps per SM</dt>
                  <dd className="font-medium">{result.activeWarpsPerSM}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Max warps per SM</dt>
                  <dd className="font-medium">{preset.maxWarpsPerSM}</dd>
                </div>
              </dl>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Enter a valid threads-per-block value.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
