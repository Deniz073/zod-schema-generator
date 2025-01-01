"use client";

import { Card } from "@/components/ui/card";
import { generateZodSchema } from "@/lib/generate-schema";
import type { SchemaField } from "@/lib/types";
import { CodeBlock } from "./ui/code-block";

interface CodePreviewProps {
  fields: SchemaField[];
}

export function CodePreview({ fields }: CodePreviewProps) {
  const schema = generateZodSchema(fields);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Generated Schema</h2>
      </div>

      <pre className="rounded-lg">
        <CodeBlock
        highlightLines={[3]}
          language="tsx"
          filename="schema.ts"
          code={schema}
        />
      </pre>
    </Card>
  );
}