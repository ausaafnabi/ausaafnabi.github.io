import type { Metadata } from "next/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OccupancyCalculator } from "@/components/tools/occupancy-calculator"
import { UnitConverter } from "@/components/tools/unit-converter"
import { TensorSizeCalculator } from "@/components/tools/tensor-size-calculator"

export const metadata: Metadata = {
  title: "CUDA Toolbox | Ausaaf Nabi",
  description: "GPU occupancy calculator, HPC unit converter, and tensor memory size estimator.",
}

export default function CudaToolboxPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">CUDA Toolbox</h1>
        <p className="text-muted-foreground">Small calculators for GPU/HPC work - runs entirely in your browser.</p>
      </div>

      <Tabs defaultValue="occupancy">
        <TabsList>
          <TabsTrigger value="occupancy">Occupancy Calculator</TabsTrigger>
          <TabsTrigger value="units">Unit Converter</TabsTrigger>
          <TabsTrigger value="tensor">Tensor Size</TabsTrigger>
        </TabsList>
        <TabsContent value="occupancy" className="pt-4">
          <OccupancyCalculator />
        </TabsContent>
        <TabsContent value="units" className="pt-4">
          <UnitConverter />
        </TabsContent>
        <TabsContent value="tensor" className="pt-4">
          <TensorSizeCalculator />
        </TabsContent>
      </Tabs>
    </div>
  )
}
