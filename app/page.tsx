"use client";

import { SchemaBuilder } from "@/components/schema-builder";
import { CodePreview } from "@/components/code-preview";
import { useState } from "react";
import type { SchemaField } from "@/lib/types";

export default function Home() {
  const [fields, setFields] = useState<SchemaField[]>([]);

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Zod Schema Generator</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SchemaBuilder fields={fields} setFields={setFields} />
          <CodePreview fields={fields} />
        </div>
      </div>
    </main>
  );
}