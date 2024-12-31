"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SchemaField } from "@/lib/types";

interface SetConfigProps {
  field: SchemaField;
  onChange: (updates: Partial<SchemaField>) => void;
}

export function SetConfig({ field, onChange }: SetConfigProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Element Type</Label>
        <Select
          value={field.params.elementType || "string"}
          onValueChange={(value) =>
            onChange({
              params: { ...field.params, elementType: value },
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="boolean">Boolean</SelectItem>
            <SelectItem value="bigint">BigInt</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}