import type { Metadata } from "next/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegexTester } from "@/components/tools/regex-tester"
import { JsonFormatter } from "@/components/tools/json-formatter"

export const metadata: Metadata = {
  title: "Regex & JSON Toolbox | Ausaaf Nabi",
  description: "Free browser-based regex tester and JSON formatter/validator.",
}

export default function RegexJsonToolboxPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Regex & JSON Toolbox</h1>
        <p className="text-muted-foreground">Runs entirely in your browser - nothing you type here leaves your machine.</p>
      </div>

      <Tabs defaultValue="regex">
        <TabsList>
          <TabsTrigger value="regex">Regex Tester</TabsTrigger>
          <TabsTrigger value="json">JSON Formatter</TabsTrigger>
        </TabsList>
        <TabsContent value="regex" className="pt-4">
          <RegexTester />
        </TabsContent>
        <TabsContent value="json" className="pt-4">
          <JsonFormatter />
        </TabsContent>
      </Tabs>
    </div>
  )
}
