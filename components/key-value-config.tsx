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

interface KeyValueConfigProps {
  field: SchemaField;
  onChange: (updates: Partial<SchemaField>) => void;
}

export function KeyValueConfig({ field, onChange }: KeyValueConfigProps) {
  const typeOptions = [
    { value: "string", label: "String" },
    { value: "number", label: "Number" },
    { value: "boolean", label: "Boolean" },
    { value: "bigint", label: "BigInt" },
    { value: "date", label: "Date" },
    { value: "any", label: "Any" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Key Type</Label>
          <Select
            value={field.params.keyType || "string"}
            onValueChange={(value) =>
              onChange({
                params: { ...field.params, keyType: value },
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Value Type</Label>
          <Select
            value={field.params.valueType || "string"}
            onValueChange={(value) =>
              onChange({
                params: { ...field.params, valueType: value },
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}