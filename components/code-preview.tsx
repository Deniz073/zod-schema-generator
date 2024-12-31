"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { generateZodSchema } from "@/lib/generate-schema";
import type { SchemaField } from "@/lib/types";

interface CodePreviewProps {
  fields: SchemaField[];
}

export function CodePreview({ fields }: CodePreviewProps) {
  const schema = generateZodSchema(fields);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(schema);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Generated Schema</h2>
        <Button variant="outline" size="sm" onClick={copyToClipboard}>
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
      </div>

      <pre className="bg-muted p-4 rounded-lg overflow-auto">
        <code className="text-sm">{schema}</code>
      </pre>
    </Card>
  );
}